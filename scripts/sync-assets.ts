import {
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { loadEnv } from "./load-env";

loadEnv();

type Remote = { name: string; client: S3Client; bucket: string };

type Options = {
  dryRun: boolean;
  reverse: boolean;
  mirror: boolean;
  force: boolean;
  excludes: string[];
};

const DEFAULT_EXCLUDES = [
  // Candidate CVs are private, per-environment data — never sync them.
  "cv/",
];

function parseArgs(argv: string[]): Options {
  const options: Options = {
    dryRun: true,
    reverse: false,
    mirror: false,
    force: false,
    excludes: [...DEFAULT_EXCLUDES],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--write":
      case "--apply":
        options.dryRun = false;
        break;
      case "--dry-run":
        options.dryRun = true;
        break;
      case "--reverse":
        options.reverse = true;
        break;
      case "--delete":
        options.mirror = true;
        break;
      case "--force":
        options.force = true;
        break;
      case "--exclude":
        options.excludes.push(argv[i + 1] ?? "");
        i += 1;
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        printHelp();
        process.exit(1);
    }
  }

  return options;
}

function printHelp(): void {
  console.log(`
Sync the public R2 assets between the dev and production accounts.

Usage:
  npm run assets:sync -- [options]

Options:
  --write, --apply   Actually copy (default is a dry run)
  --dry-run          Preview only (default)
  --reverse          Copy prod → dev instead of dev → prod
  --delete           Mirror deletions (removes target objects absent from source)
  --force            Re-copy everything, even if sizes match
  --exclude <prefix> Additional key prefix to skip (repeatable)
  -h, --help         Show this help

Environment (public assets buckets):
  R2_DEV_ACCOUNT_ID / R2_DEV_ACCESS_KEY_ID / R2_DEV_SECRET_ACCESS_KEY / R2_DEV_BUCKET
  R2_PROD_ACCOUNT_ID / R2_PROD_ACCESS_KEY_ID / R2_PROD_SECRET_ACCESS_KEY / R2_PROD_BUCKET

Note: "cv/" is always excluded — candidate CVs must not leave their environment.
`);
}

function buildRemote(
  label: string,
  prefix: "R2_DEV" | "R2_PROD",
): Remote | null {
  const accountId = process.env[`${prefix}_ACCOUNT_ID`];
  const accessKeyId = process.env[`${prefix}_ACCESS_KEY_ID`];
  const secretAccessKey = process.env[`${prefix}_SECRET_ACCESS_KEY`];
  const bucket = process.env[`${prefix}_BUCKET`];

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    console.error(
      `Missing R2 credentials for "${label}". Set ${prefix}_ACCOUNT_ID, ${prefix}_ACCESS_KEY_ID, ${prefix}_SECRET_ACCESS_KEY and ${prefix}_BUCKET.`,
    );
    return null;
  }

  return {
    name: label,
    bucket,
    client: new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    }),
  };
}

function isExcluded(key: string, excludes: string[]): boolean {
  return excludes.some((prefix) => prefix !== "" && key.startsWith(prefix));
}

type ListedObject = { key: string; size: number };

async function listObjects(
  remote: Remote,
  excludes: string[],
): Promise<ListedObject[]> {
  const found: ListedObject[] = [];
  let token: string | undefined;

  do {
    const page = await remote.client.send(
      new ListObjectsV2Command({
        Bucket: remote.bucket,
        ContinuationToken: token,
      }),
    );
    for (const object of page.Contents ?? []) {
      if (!object.Key || object.Size === undefined) continue;
      if (isExcluded(object.Key, excludes)) continue;
      found.push({ key: object.Key, size: object.Size });
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);

  return found;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function copyObject(
  source: Remote,
  target: Remote,
  key: string,
  size: number,
): Promise<void> {
  const head = await source.client.send(
    new HeadObjectCommand({ Bucket: source.bucket, Key: key }),
  );
  const object = await source.client.send(
    new GetObjectCommand({ Bucket: source.bucket, Key: key }),
  );

  await target.client.send(
    new PutObjectCommand({
      Bucket: target.bucket,
      Key: key,
      Body: object.Body,
      ContentLength: size,
      ...(head.ContentType ? { ContentType: head.ContentType } : {}),
      ...(head.CacheControl ? { CacheControl: head.CacheControl } : {}),
    }),
  );
}

async function deleteObjects(
  remote: Remote,
  keys: string[],
): Promise<number> {
  let deleted = 0;
  for (let i = 0; i < keys.length; i += 1000) {
    const batch = keys.slice(i, i + 1000);
    await remote.client.send(
      new DeleteObjectsCommand({
        Bucket: remote.bucket,
        Delete: { Objects: batch.map((Key) => ({ Key })) },
      }),
    );
    deleted += batch.length;
  }
  return deleted;
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));

  const dev = buildRemote("dev", "R2_DEV");
  const prod = buildRemote("prod", "R2_PROD");
  if (!dev || !prod) process.exit(1);

  const source = options.reverse ? prod : dev;
  const target = options.reverse ? dev : prod;

  console.log(
    `${options.dryRun ? "DRY RUN — " : ""}${source.name}:${source.bucket} → ${target.name}:${target.bucket}`,
  );
  console.log(`Excluded prefixes: ${options.excludes.join(", ")}\n`);

  const [sourceObjects, targetObjects] = await Promise.all([
    listObjects(source, options.excludes),
    listObjects(target, options.excludes),
  ]);

  const targetSizes = new Map(targetObjects.map((o) => [o.key, o.size]));

  const toCopy = options.force
    ? sourceObjects
    : sourceObjects.filter((o) => targetSizes.get(o.key) !== o.size);

  const toDelete = options.mirror
    ? targetObjects
        .filter((o) => !sourceObjects.some((s) => s.key === o.key))
        .map((o) => o.key)
    : [];

  console.log(
    `Source: ${sourceObjects.length} objects · target: ${targetObjects.length} · to copy: ${toCopy.length}${options.mirror ? ` · to delete: ${toDelete.length}` : ""}\n`,
  );

  if (toCopy.length === 0 && toDelete.length === 0) {
    console.log("Nothing to do — both buckets already match.");
    return;
  }

  let copied = 0;
  let bytes = 0;
  for (const object of toCopy) {
    const action = targetSizes.has(object.key) ? "update" : "add";
    if (options.dryRun) {
      console.log(`  would ${action}  ${object.key}  (${formatBytes(object.size)})`);
    } else {
      await copyObject(source, target, object.key, object.size);
      console.log(`  ${action}d  ${object.key}  (${formatBytes(object.size)})`);
    }
    copied += 1;
    bytes += object.size;
  }

  if (options.mirror) {
    for (const key of toDelete) {
      if (options.dryRun) {
        console.log(`  would delete  ${key}`);
      }
    }
    if (!options.dryRun && toDelete.length > 0) {
      const deleted = await deleteObjects(target, toDelete);
      console.log(`\nDeleted ${deleted} object(s) from ${target.name}.`);
    }
  }

  console.log(
    `\n${options.dryRun ? "Would copy" : "Copied"} ${copied} object(s), ${formatBytes(bytes)}.`,
  );
  if (options.dryRun) {
    console.log("Re-run with --write to apply.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

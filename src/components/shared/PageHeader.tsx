export default function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {lede ? (
        <p className="mt-5 text-lg leading-relaxed text-foreground">{lede}</p>
      ) : null}
    </div>
  );
}

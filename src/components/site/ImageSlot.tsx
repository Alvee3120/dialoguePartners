import Image from "next/image";

/**
 * ImageSlot renders a real image when a URL is provided, or a styled
 * placeholder box (with filename hint) when only a `suggestedPath` is set.
 *
 * Usage — wrap it in a sized, `relative`, `overflow-hidden` parent:
 *
 *   <div className="relative aspect-[16/9] overflow-hidden">
 *     <ImageSlot description="..." suggestedPath="/images/...jpg" />
 *   </div>
 *
 * Pass `url` (an absolute http(s) URL) to display a real remote image, or drop
 * a file at `public{suggestedPath}` and switch the component to next/image.
 */

type ImageSlotProps = {
  /** What the image/placeholder should depict. */
  description: string;
  /** Where a local file should live, e.g. /images/home/hero.jpg */
  suggestedPath: string;
  /** Optional remote URL to render instead of the placeholder. */
  url?: string;
  /** Use on dark surfaces (true) or light surfaces (false). */
  dark?: boolean;
};

const cameraGlyph = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="mx-auto size-6 opacity-70"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

export default function ImageSlot({
  description,
  suggestedPath,
  url,
  dark = false,
}: ImageSlotProps) {
  if (url) {
    return (
      <Image
        src={url}
        alt={description}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${description}`}
      className={`absolute inset-0 flex items-center justify-center overflow-hidden p-6 text-center ${
        dark
          ? "border-2 border-dashed border-white/20 bg-white/[0.06] text-white/80"
          : "border-2 border-dashed border-line bg-slate-100 text-slate-500"
      }`}
    >
      <div className="max-w-xs">
        {cameraGlyph}
        <p className="mt-3 text-sm font-medium leading-snug">{description}</p>
        <p
          className={`mt-2 font-mono text-[11px] ${
            dark ? "text-white/50" : "text-slate-400"
          }`}
        >
          {suggestedPath}
        </p>
      </div>
    </div>
  );
}
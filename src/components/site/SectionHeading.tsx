type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  light?: boolean;
  center?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  light = false,
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          light ? "text-accent-soft" : "text-accent-deep"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-[28px] font-semibold leading-[1.15] tracking-tight sm:text-[32px] lg:text-[40px] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/70" : "text-foreground"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

const keywords = [
  "Climate resilience",
  "Decarbonization",
  "Circularity",
  "Decent work",
  "Technology & innovation",
  "Operational excellence",
  "Trade & policy",
];

/** Scrolling keyword strip — a Rovix signature, themed to our five pillars. */
export default function Keywords() {
  const track = [...keywords, ...keywords];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-navy py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {track.map((keyword, i) => (
          <span
            key={`${keyword}-${i}`}
            className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-white/60"
          >
            {keyword}
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}

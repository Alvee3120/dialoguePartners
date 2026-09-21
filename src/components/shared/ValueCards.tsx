import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { ValueIcon, values } from "@/components/shared/ValuesGrid";

function ValueCard({ value }: { value: (typeof values)[number] }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-26px_rgba(16,32,47,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(16,32,47,0.45)] motion-reduce:hover:translate-y-0">
      <div className="relative h-48 shrink-0 overflow-hidden">
        <Image
          src={value.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-9">
        <span className="absolute -top-6 left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-full bg-accent-soft text-accent-deep ring-4 ring-white">
          <ValueIcon name={value.icon} />
        </span>

        <h3 className="text-[18px] font-semibold tracking-tight text-ink">
          {value.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {value.summary}
        </p>
      </div>
    </article>
  );
}

export default function ValueCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((value, i) => (
        <Reveal key={value.name} delay={i * 90} className="h-full">
          <ValueCard value={value} />
        </Reveal>
      ))}
    </div>
  );
}

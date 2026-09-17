"use client";

import { useState } from "react";
import Container from "@/components/site/Container";
import type { Faq } from "@/data/about";

export default function FaqSection({
  categories,
  faqs,
}: {
  categories: readonly string[];
  faqs: Faq[];
}) {
  const [active, setActive] = useState(categories[0]);
  const visible = faqs.filter((faq) => faq.category === active);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground">
            The questions we hear most from brands, manufacturers, and partners
            exploring the ecosystem.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={category === active}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep ${
                category === active
                  ? "bg-navy text-white"
                  : "border border-line bg-white text-ink hover:border-accent-deep hover:text-accent-deep"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {visible.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-medium text-ink">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className="relative size-5 shrink-0 text-accent-deep"
                >
                  <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open:scale-y-0 motion-reduce:transition-none" />
                </span>
              </summary>
              <p className="pb-5 pr-10 leading-relaxed text-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import { clients } from "@/data/clients";

export default function Clients() {
  return (
    <section className="border-y border-line bg-paper py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
            Clients
          </p>
          <h2 className="mt-3 text-[24px] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[28px]">
            Trusted by brands &amp; partners
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            A growing network of global brands and industry partners we work
            with across the RMG ecosystem.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {clients.map((client, i) => (
            <Reveal key={client.placeholderPath} delay={i * 70}>
              <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-4">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name ?? "Client logo"}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-contain p-6"
                  />
                ) : (
                  <div className="text-center">
                    {client.name ? (
                      <p className="text-sm font-medium text-foreground">
                        {client.name}
                      </p>
                    ) : null}
                    <p className="mt-1 font-mono text-[11px] text-foreground/40">
                      {client.placeholderPath}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { ChartBar, Factory, Gear, Globe, Leaf, UsersThree } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/site/Container";
import { site } from "@/data/site";
import styles from "./OurRoleSection.module.css";

const pillars = [
  { icon: UsersThree, title: "People", note: "Stronger Together" },
  { icon: Leaf, title: "Sustainable Growth", note: "A Cleaner Tomorrow" },
  { icon: ChartBar, title: "Real Impact", note: "From Insight to Action" },
] as const;

const stakeholderCards = [
  {
    icon: Globe,
    tone: "global",
    title: "Global Brands",
    note: "Driving responsible supply chains.",
  },
  {
    icon: Factory,
    tone: "local",
    title: "Local Manufacturers",
    note: "Building capability and brighter futures.",
  },
  {
    icon: Gear,
    tone: "tech",
    title: "Technology Leaders",
    note: "Enabling a smarter, more connected industry.",
  },
] as const;

export default function OurRoleSection() {
  return (
    <section
      className={`relative overflow-hidden py-12 sm:py-16 ${styles.roleSection}`}
      style={{ backgroundImage: `url(${site.roleBackground})` }}
    >
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div>

            {/* Eyebrow */}
            <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              <span aria-hidden="true" className="h-px w-9 bg-accent-deep" />
              Our Role
            </p>

            {/* Heading */}
            <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-tight text-ink">
              All stakeholders.
              <br />
              One <span className="text-accent-bright">connected ecosystem.</span>
            </h2>

            {/* Description */}
            <div className="mt-6 max-w-xl space-y-5 text-base leading-relaxed text-foreground sm:text-lg">
              <p>
                Dialogue Partners was founded to be the North Star for this
                transformation. We sit at the intersection of global brands,
                local manufacturers, and technology leaders, bridging gaps and
                creating leverage for the coming decades.
              </p>
              <p>
                Global standards, local capability, capital, and regulation all
                have to move together. Our role is to connect the people
                responsible for each of them and turn conversation into
                deliverable strategy.
              </p>
            </div>

            {/* =========================
                THREE PILLARS
            ========================== */}
            <div className="mt-9 flex max-w-xl flex-col md:flex-row md:items-center">
              {pillars.map(({ icon: Icon, title, note }, index) => (
                <div
                  key={title}
                  className={`flex items-center gap-3 md:flex-1 md:py-2 ${
                    index > 0
                      ? "mt-4 border-t border-line pt-4 md:mt-0 md:border-l md:border-t-0 md:pl-5 md:pt-2"
                      : ""
                  } ${index < pillars.length - 1 ? "md:pr-5" : ""}`}
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{title}</h3>
                    <p className="text-xs text-foreground">{note}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* =========================
              RIGHT VISUAL
          ========================== */}

          {/* On mobile the cards stack in normal flow; from lg they are
              absolutely positioned around the connector curve. */}
          <div className="relative lg:min-h-[440px]">

            {/* Connecting curve between the cards */}
            <svg
              className={styles.connector}
              viewBox="0 0 440 560"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className={styles.connectorDashed}
                d="M320 90 C 250 110, 160 150, 130 230"
              />
              <path
                className={styles.connectorSolid}
                d="M130 230 C 105 300, 150 380, 300 470"
              />
              <circle className={styles.connectorDot} cx="320" cy="90" r="5" />
              <circle className={styles.connectorDot} cx="130" cy="230" r="5" />
              <circle className={styles.connectorDot} cx="300" cy="470" r="5" />
            </svg>

            {/* =========================
                STAKEHOLDER CARDS
            ========================== */}

            <div className={styles.cards}>
              {stakeholderCards.map(({ icon: Icon, tone, title, note }) => (
                <div
                  key={tone}
                  className={`flex items-start gap-3.5 rounded-2xl border border-line bg-white/95 p-4 shadow-lg ${styles.card} ${styles[`card-${tone}`]}`}
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
                    <Icon aria-hidden="true" className="size-[22px]" />
                  </span>
                  <div>
                    <strong className="block text-sm font-semibold text-ink">
                      {title}
                    </strong>
                    <p className="mt-1 text-xs leading-relaxed text-foreground">
                      {note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Connect With Us",
  description: "Get in touch with Dialogue Partners.",
};

const contactRows = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Office", value: site.address },
];

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-foreground/50 focus:border-accent-deep focus:ring-2 focus:ring-accent-soft";

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-paper py-16 sm:py-24">
        <Container>
          <PageHeader
            eyebrow="Connect With Us"
            title="Great transformation starts with a conversation."
            lede="Tell us where you are in your journey — whether you're exploring sourcing in Bangladesh, preparing your factory for its next phase of growth, or looking to shape policy for the sector's future — and we'll connect you with the right advisor."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
            {/* Contact form */}
            <form className="rounded-3xl border border-line bg-paper p-7 sm:p-10">
              <p className="text-sm leading-relaxed">
                Complete the form and one of our advisors will be in touch to
                arrange a conversation.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                    Full Name
                  </span>
                  <input type="text" name="name" required placeholder="Jane Doe" className={`mt-2 ${fieldClass}`} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                    Company / Organization
                  </span>
                  <input type="text" name="company" placeholder="Acme Ltd." className={`mt-2 ${fieldClass}`} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                    Email Address
                  </span>
                  <input type="email" name="email" required placeholder="you@company.com" className={`mt-2 ${fieldClass}`} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                    Phone Number
                  </span>
                  <input type="tel" name="phone" placeholder="+880 ..." className={`mt-2 ${fieldClass}`} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                    I am a
                  </span>
                  <select name="role" className={`mt-2 ${fieldClass}`} defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option value="global-brand">Global Brand</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="investor">Investor</option>
                    <option value="policymaker">Policymaker</option>
                    <option value="technology">Technology Partner</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                    Area of Interest
                  </span>
                  <select name="interest" className={`mt-2 ${fieldClass}`} defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="investment-trade">Investment &amp; Trade</option>
                    <option value="supply-chain">Supply Chain</option>
                    <option value="operational-excellence">Operational Excellence</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
                    Message
                  </span>
                  <textarea name="message" rows={5} placeholder="Tell us a little about your goals..." className={`mt-2 ${fieldClass} resize-y`} />
                </label>
              </div>
              <button
                type="submit"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-soft"
              >
                Send Message
                <span aria-hidden="true">→</span>
              </button>
            </form>

            {/* Contact details + map placeholder */}
            <div className="flex flex-col gap-8">
              <div className="rounded-3xl bg-navy p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
                  Direct Contact
                </p>
                <ul className="mt-6 space-y-5 text-sm">
                  {contactRows.map((row) => (
                    <li key={row.label} className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                        {row.label}
                      </span>
                      {row.href ? (
                        <a href={row.href} className="break-all text-white/90 transition-colors hover:text-white">
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-white/90">{row.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">Follow us</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["LinkedIn", "Facebook", "X"].map((platform) => (
                      <a
                        key={platform}
                        href="#"
                        className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white hover:bg-white/10"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-line bg-slate-100 text-center">
                <div className="p-6">
                  <p className="text-sm font-medium text-slate-500">Google Maps location</p>
                  <p className="mt-1 font-mono text-[11px] text-slate-400">Map embed placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
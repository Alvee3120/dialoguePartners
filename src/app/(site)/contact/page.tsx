import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/site/ContactForm";
import { site, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Connect With Us",
  description: "Get in touch with Dialogue Partners.",
};

const contactRows = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Office", value: site.address },
];

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
            <ContactForm />

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
                    {socialLinks.map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white hover:bg-white/10"
                      >
                        {label}
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
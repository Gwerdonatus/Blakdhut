"use client";

import React from "react";
import TrustStrip from "@/components/TrustBanner";
import SupportWidget from "@/components/SupportWidget";

const WHATSAPP_NUMBER = "2347080364541"; // no + sign
const TELEGRAM_URL = "https://t.me/blakdhute";

const CTA_MESSAGE =
  "Hi Blakdhut Prop Funding Desk, I want to fund my prop firm account.\n\nProp firm:\nAccount size:\nPreferred crypto (USDT/USDC):\nCountry:\n";

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type FAQItem = { q: string; a: React.ReactNode };

const faqs: FAQItem[] = [
  {
    q: "Do you trade on my behalf?",
    a: (
      <>
        No. This is{" "}
        <span className="text-[#f0b90b] font-semibold">funding only</span>. We do
        not trade, manage accounts, or provide investment advice.
      </>
    ),
  },
  {
    q: "What do I need to send to start?",
    a: (
      <ul className="list-disc pl-5 space-y-1 text-gray-300">
        <li>Prop firm name</li>
        <li>Account size ($5k, $10k, $25k, etc.)</li>
        <li>Preferred crypto (USDT / USDC)</li>
        <li>Country (optional but helpful)</li>
      </ul>
    ),
  },
  {
    q: "Are there hidden fees?",
    a: (
      <>
        No. We confirm the amount and service fee{" "}
        <span className="text-[#f0b90b] font-semibold">before</span> execution.
      </>
    ),
  },
  {
    q: "Is KYC required?",
    a: (
      <>
        For compliance and security, KYC{" "}
        <span className="text-[#f0b90b] font-semibold">may</span> be required for
        larger transactions.
      </>
    ),
  },
  {
    q: "Are you affiliated with any prop firm?",
    a: (
      <>
        No. Blakdhut is not affiliated with, sponsored by, or endorsed by any
        prop firm.
      </>
    ),
  },
];

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4">{children}</div>;
}

/**
 * ✅ Background FX (NO YELLOW GLOW)
 * - Adds a VERY subtle “base net” that fades into the page (cohesion)
 * - Keeps two distinct “net boxes” on the right/edge area (feature)
 * - Desktop: right-half vibe (base net + boxes layered)
 * - Mobile: cropped boxes on the right edge + base net fading
 * - Subtle vignette keeps text readable
 */
function BgFX() {
  const baseGrid = {
    backgroundImage: `
      linear-gradient(rgba(148,163,184,0.32) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148,163,184,0.32) 1px, transparent 1px)
    `,
    backgroundPosition: "center",
  } as const;

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#12161c]" />

      {/* =======================
          BASE NET (ambient / subtle)
          - Lives behind everything
          - Helps the hero feel like it “fades into” the page
         ======================= */}

      {/* Base net - desktop */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          ...baseGrid,
          opacity: 0.07,
          backgroundSize: "96px 96px",
          // Stronger on right, fades toward left (so content area stays clean)
          maskImage:
            "radial-gradient(circle at 78% 26%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0) 82%)",
          WebkitMaskImage:
            "radial-gradient(circle at 78% 26%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0) 82%)",
        }}
      />

      {/* Base net - mobile */}
      <div
        className="md:hidden absolute inset-0"
        style={{
          ...baseGrid,
          opacity: 0.06,
          backgroundSize: "104px 104px",
          // Mostly top portion, fades out by mid-screen
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 72%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 72%)",
        }}
      />

      {/* =======================
          FEATURE NET BOXES (foreground-ish)
         ======================= */}

      {/* DESKTOP: two net boxes on RIGHT side */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          // constrain FX to right side and fade toward left/text
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0) 66%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0) 66%)",
        }}
      >
        {/* Box A */}
        <div
          className="absolute right-[6%] top-[14%] h-[360px] w-[420px] rounded-3xl border border-white/10 bg-[#0f141b]/10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.38) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.38) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            backgroundPosition: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        />

        {/* Box B (offset + different density) */}
        <div
          className="absolute right-[14%] top-[44%] h-[300px] w-[380px] rounded-3xl border border-white/10 bg-[#0f141b]/10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.34) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.34) 1px, transparent 1px)
            `,
            backgroundSize: "78px 78px",
            backgroundPosition: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
          }}
        />

        {/* Subtle hint line between panels (related, not joined) */}
        <div
          className="absolute right-[18%] top-[36%] h-[1px] w-[220px] bg-white/10"
          style={{ transform: "rotate(-12deg)" }}
        />
      </div>

      {/* MOBILE: two net boxes cropped at right edge / top-half */}
      <div
        className="md:hidden absolute inset-0"
        style={{
          // show mainly on top portion and fade out by mid screen
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.78) 44%, rgba(0,0,0,0) 72%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.78) 44%, rgba(0,0,0,0) 72%)",
        }}
      >
        {/* Box A (pushed right so it crops) */}
        <div
          className="absolute -right-[110px] top-[60px] h-[240px] w-[320px] rounded-3xl border border-white/10 bg-[#0f141b]/10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.36) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.36) 1px, transparent 1px)
            `,
            backgroundSize: "58px 58px",
            backgroundPosition: "center",
            boxShadow: "0 16px 50px rgba(0,0,0,0.35)",
          }}
        />

        {/* Box B (offset, also cropped) */}
        <div
          className="absolute -right-[70px] top-[210px] h-[210px] w-[300px] rounded-3xl border border-white/10 bg-[#0f141b]/10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.32) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.32) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            backgroundPosition: "center",
            boxShadow: "0 16px 50px rgba(0,0,0,0.30)",
          }}
        />

        {/* tiny hint line */}
        <div
          className="absolute -right-[40px] top-[190px] h-[1px] w-[170px] bg-white/10"
          style={{ transform: "rotate(-10deg)" }}
        />
      </div>

      {/* Vignette for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 45% 20%, rgba(18,22,28,0) 0%, rgba(18,22,28,0.22) 55%, rgba(18,22,28,0.70) 100%)",
        }}
      />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#27313d] bg-[#12161c]/60 px-3 py-1 text-xs font-semibold text-[#f0b90b]">
      {children}
    </span>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#27313d] bg-[#12161c]/60 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="text-lg font-bold text-white">{title}</div>
      <div className="mt-2 text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14">
      <Container>
        {eyebrow && (
          <div className="text-xs tracking-widest uppercase mb-3 font-semibold text-[#f0b90b]/80">
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-300">
            {subtitle}
          </p>
        )}
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-xl bg-[#f0b90b] px-5 py-3 font-bold text-black transition hover:opacity-95 active:scale-[0.99]"
    >
      {children}
    </a>
  );
}

function OutlineButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-xl border border-[#f0b90b] bg-transparent px-5 py-3 font-bold text-[#f0b90b] transition hover:bg-[#f0b90b]/10 active:scale-[0.99]"
    >
      {children}
    </a>
  );
}

function Steps() {
  const steps = [
    {
      title: "Contact",
      text: "You contact Blakdhut Prop Funding Desk (WhatsApp preferred).",
    },
    {
      title: "Provide Details",
      text: "Prop firm name, account size, preferred crypto (USDT/USDC).",
    },
    {
      title: "Confirmation",
      text: "We confirm the amount and service fee before execution.",
    },
    {
      title: "Execution",
      text: "Funding is completed after confirmation. One account per request.",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 gap-5">
      {steps.map((s, i) => (
        <div
          key={s.title}
          className="rounded-2xl border border-[#27313d] bg-[#12161c]/50 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#f0b90b]/15 text-[#f0b90b] flex items-center justify-center font-extrabold">
              {i + 1}
            </div>
            <div className="font-bold text-white">{s.title}</div>
          </div>
          <div className="mt-3 text-gray-300 leading-relaxed">{s.text}</div>
        </div>
      ))}
    </div>
  );
}

function Accordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden border border-[#27313d] bg-[#12161c]/55"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
            >
              <span className="font-bold text-white">{item.q}</span>
              <span className="text-2xl leading-none text-[#f0b90b]">
                {open ? "–" : "+"}
              </span>
            </button>
            {open && (
              <div className="px-5 pb-5 text-gray-300 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PropFundingPage() {
  const whatsapp = waLink(CTA_MESSAGE);

  return (
    <main className="relative text-white bg-[#12161c] overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-24 md:pt-28 pb-10">
        <BgFX />
        <Container>
          <div className="relative">
            <div className="flex flex-wrap gap-2 mb-5">
              <Pill>Execution-only</Pill>
              <Pill>USDT / USDC</Pill>
              <Pill>Clear confirmation</Pill>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Blakdhut <span className="text-[#f0b90b]">Prop Funding</span> Desk
            </h1>

            <p className="mt-4 text-lg max-w-3xl leading-relaxed text-gray-300">
              Fast, secure prop firm funding using crypto — built for serious
              traders.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <PrimaryButton href={whatsapp}>Contact on WhatsApp</PrimaryButton>
              <OutlineButton href={TELEGRAM_URL}>Telegram</OutlineButton>
              <OutlineButton href="#how-it-works">How it works</OutlineButton>
            </div>

            <div className="mt-7 rounded-2xl border border-[#27313d] bg-[#12161c]/55 p-5">
              <div className="font-bold text-white mb-1">Important</div>
              <div className="text-gray-300 leading-relaxed">
                We fund accounts. We do{" "}
                <span className="text-[#f0b90b] font-semibold">not</span> trade
                on your behalf.
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Blakdhut is not affiliated with, sponsored by, or endorsed by
                any prop firm.
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[#27313d] bg-[#12161c]/45 p-5">
                <div className="font-bold text-white">
                  Avoid card & P2P stress
                </div>
                <div className="mt-1 text-gray-400">
                  Crypto-first funding to reduce delays.
                </div>
              </div>
              <div className="rounded-2xl border border-[#27313d] bg-[#12161c]/45 p-5">
                <div className="font-bold text-white">
                  Confirm before execution
                </div>
                <div className="mt-1 text-gray-400">
                  You approve the total amount and fee.
                </div>
              </div>
              <div className="rounded-2xl border border-[#27313d] bg-[#12161c]/45 p-5">
                <div className="font-bold text-white">Desk rules = speed</div>
                <div className="mt-1 text-gray-400">
                  One request, one account, clean processing.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTENT SECTIONS */}
      <Section
        id="what-this-is"
        eyebrow="What this is"
        title="Fund Your Prop Firm Account Without the Stress"
        subtitle="Blakdhut Prop Funding Desk helps forex traders fund prop firm challenges and accounts using crypto — without dealing with multiple exchanges, failed cards, or unnecessary delays."
      >
        <div className="grid md:grid-cols-2 gap-5">
          <Card title="We handle the funding">
            You provide the details, we confirm the amount + service fee, then
            execute funding after confirmation.
          </Card>
          <Card title="You focus on trading">
            Less back-and-forth, clearer communication, faster execution.
          </Card>
        </div>
      </Section>

      <Section
        id="who-this-is-for"
        eyebrow="Who this is for"
        title="Built for Traders Who Want Clear Execution"
        subtitle="If you already trade — this removes friction."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card title="Prop firm challenges">
            Forex traders funding prop firm challenges and accounts.
          </Card>
          <Card title="Community challenges">
            Traders participating in community challenges.
          </Card>
          <Card title="Prefer crypto">
            USDT/USDC instead of card or P2P stress.
          </Card>
          <Card title="Speed + clarity">
            Fast execution and clear communication.
          </Card>
        </div>
      </Section>

      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="Simple. Structured. Reliable."
        subtitle="Execution starts after confirmation."
      >
        <Steps />
      </Section>

      <Section
        id="fees"
        eyebrow="Fees & transparency"
        title="Clear Pricing Before Execution"
        subtitle="No hidden fees — you approve everything before we proceed."
      >
        <div className="grid md:grid-cols-3 gap-5">
          <Card title="Competitive crypto rates">
            Competitive rates for USDT/USDC funding.
          </Card>
          <Card title="Small fixed service charge">
            Fixed service charge per transaction.
          </Card>
          <Card title="No surprises">Final confirmation before execution.</Card>
        </div>

        <div className="mt-6 rounded-2xl border border-[#27313d] bg-[#12161c]/45 p-6">
          <div className="font-bold text-white mb-2">Compliance note</div>
          <div className="text-gray-300 leading-relaxed">
            For compliance and security, KYC may be required for larger
            transactions.
          </div>
        </div>
      </Section>

      <Section
        id="why-blakdhut"
        eyebrow="Why Blakdhut"
        title="A Real Desk — Not a Random Middleman"
        subtitle="Built by traders, for traders."
      >
        <div className="grid md:grid-cols-2 gap-5">
          <Card title="Execution history + fast response">
            Established crypto desk with real transaction history and quick
            response time.
          </Card>
          <Card title="Clear rules">
            Separate desk strictly for prop firm funding. We reserve the right
            to decline requests that don’t meet our rules.
          </Card>
        </div>
      </Section>

      <Section
        id="important-notes"
        eyebrow="Important notes"
        title="Rules That Keep Execution Clean"
        subtitle="This keeps the desk fast and predictable."
      >
        <div className="rounded-2xl border border-[#27313d] bg-[#12161c]/55 p-6">
          <ul className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed">
            <li>Funding only — no account management.</li>
            <li>One account per request.</li>
            <li>
              We reserve the right to decline requests that don’t meet our
              rules.
            </li>
            <li>All transactions are final once executed.</li>
          </ul>
        </div>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Quick Answers"
        subtitle="Common questions before funding."
      >
        <Accordion items={faqs} />
      </Section>

      {/* FINAL CTA */}
      <section className="pb-16 pt-6">
        <Container>
          <div className="rounded-3xl border border-[#27313d] bg-[#12161c]/60 p-7 md:p-10 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
            <h3 className="text-2xl md:text-3xl font-extrabold">
              Ready to fund your prop firm account?
            </h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-gray-300">
              Contact Blakdhut Prop Funding Desk on WhatsApp. Execution starts
              after confirmation.
            </p>

            <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-start md:justify-between">
              <div className="flex flex-col sm:flex-row gap-3">
                <PrimaryButton href={whatsapp}>Start on WhatsApp</PrimaryButton>
                <OutlineButton href={TELEGRAM_URL}>Telegram</OutlineButton>
              </div>

              <div className="rounded-2xl border border-[#27313d] bg-[#12161c]/55 p-5 w-full md:max-w-md">
                <div className="font-bold text-white mb-2">What to send</div>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>Prop firm name</li>
                  <li>Account size</li>
                  <li>Preferred crypto (USDT/USDC)</li>
                  <li>Country (optional but helpful)</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip />
      <SupportWidget />
    </main>
  );
}

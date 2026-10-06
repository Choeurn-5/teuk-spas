import Image from 'next/image'
import Link from 'next/link'
import { getTreatments } from '@/lib/content/getters'
import { FadeIn } from '@/components/ui/FadeIn'
import { PageHero } from '@/components/ui/PageHero'
import { TreatmentModalityMatrix } from '@/components/spa/TreatmentModalityMatrix'
import { AromaOilBar } from '@/components/spa/AromaOilBar'

// ─── helpers ────────────────────────────────────────────────────────────────

function resolveImage(t: { imageUrl?: string; name: string }): string {
  if (t.imageUrl) return t.imageUrl
  if (/aroma/i.test(t.name)) return '/images/aromatherapy.jpg'
  if (/herbal|compress/i.test(t.name)) return '/images/herbal_compress.jpg'
  return '/images/massage_treatment.jpg'
}

// ─── component ──────────────────────────────────────────────────────────────

export default async function TreatmentsPage() {
  const treatments = await getTreatments()

  return (
    <div className="bg-[#FAF7F2] text-[#2C2C2C] font-sans overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          1. HERO — Generous Height Luxury Ken Burns
      ══════════════════════════════════════════════════════ */}
      <PageHero
        image="/images/spa_herbs.jpg"
        badge="✦ Botanical Healing & Khmer Tradition"
        scriptTag="The Art of Stillness"
        title="Curated Healing"
        titleAccent="Rituals"
        description="Rooted in centuries of Khmer natural medicine, each treatment blends wild-crafted botanicals, pure essential oils, and intuitive pressure to awaken harmony."
        heightClass="h-screen min-h-[750px] lg:min-h-[820px]"
        actions={{
          primary: { label: "Book a Treatment", href: "/book" },
          secondary: { label: "View Packages", href: "/packages" },
        }}
      />

      {/* ══════════════════════════════════════════════════════
          2. SECTION INTRO
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-6 text-center">
        <FadeIn direction="up" delay={0.05}>
          {/* gold overline */}
          <p
            className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4 font-sans font-medium"
          >
            Every Treatment is a Ritual
          </p>

          <h2
            className="font-serif text-4xl md:text-5xl text-[#4A5240] leading-snug mb-6 max-w-2xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Crafted to restore, renew,&nbsp;and&nbsp;revive
          </h2>

          <p className="text-[#2C2C2C]/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Each session at Teuk Spa draws on Cambodian botanical traditions and
            time-honoured techniques to bring you profound, lasting wellbeing.
          </p>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════════
          2.5 TREATMENT MODALITY COMPARISON MATRIX
      ══════════════════════════════════════════════════════ */}
      <TreatmentModalityMatrix />

      {/* ══════════════════════════════════════════════════════
          3. TREATMENT CARDS — magazine-style full-width splits
      ══════════════════════════════════════════════════════ */}
      <section className="pb-16 md:pb-24">
        {treatments.map((treatment, idx) => {
          const isOdd = idx % 2 !== 0 // odd index → image RIGHT → flex-row-reverse
          const imgSrc = resolveImage(treatment)

          return (
            <div key={treatment.id ?? idx}>

              {/* ── CARD ── */}
              <FadeIn direction="up" delay={0.05} className="w-full">
                <div
                  className={`flex flex-col md:flex-row ${isOdd ? 'md:flex-row-reverse' : ''} w-full`}
                >

                  {/* IMAGE SIDE */}
                  <div className="relative w-full md:w-1/2 h-80 md:h-[480px] overflow-hidden group">
                    <Image
                      src={imgSrc}
                      alt={treatment.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* dark overlay on hover */}
                    <div className="absolute inset-0 bg-[#2C2C2C]/10 group-hover:bg-[#2C2C2C]/0 transition-colors duration-500" />

                    {/* category pill badge */}
                    {treatment.category && (
                      <div className="absolute top-5 left-5 z-10">
                        <span className="inline-block bg-[#C9A84C] text-[#FAF7F2] text-[10px] tracking-[0.25em] uppercase font-medium px-3 py-1 rounded-full shadow-md">
                          {treatment.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CONTENT SIDE */}
                  <div className="w-full md:w-1/2 bg-[#F5F0E8] p-10 md:p-16 flex flex-col justify-center">

                    {/* gold overline */}
                    <p className="text-[#C9A84C] text-[10px] tracking-[0.35em] uppercase font-medium mb-3">
                      Signature Treatment
                    </p>

                    {/* treatment name */}
                    <h3
                      className="font-serif text-3xl md:text-4xl text-[#4A5240] leading-snug mb-5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {treatment.name}
                    </h3>

                    {/* description */}
                    <p className="text-[#2C2C2C]/70 leading-relaxed mb-8 max-w-prose">
                      {treatment.description}
                    </p>

                    {/* badges row */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {treatment.duration && (
                        <span className="inline-flex items-center gap-1.5 bg-[#E8E4DC] text-[#4A5240] text-sm font-medium px-4 py-1.5 rounded-full border border-[#4A5240]/20">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3.5 h-3.5 text-[#7A8C6E]"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {treatment.duration}
                        </span>
                      )}

                      {treatment.price && (
                        <span className="inline-flex items-center bg-[#4A5240] text-[#C9A84C] text-sm font-semibold tracking-wide px-5 py-1.5 rounded-full">
                          {treatment.price}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 self-start bg-[#C9A84C] hover:bg-[#b8953e] text-[#FAF7F2] text-sm tracking-[0.15em] uppercase font-medium px-7 py-3.5 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg group"
                    >
                      Book This Treatment
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>

                  </div>
                </div>
              </FadeIn>

              {/* ── GOLD DIVIDER between cards (not after last) ── */}
              {idx < treatments.length - 1 && (
                <div className="flex items-center justify-center py-0">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-[#C9A84C]/40" />
                  {/* diamond ornament */}
                  <div
                    className="mx-4 flex-shrink-0 w-3 h-3 bg-[#C9A84C] rotate-45"
                    aria-hidden="true"
                  />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A84C]/40 to-[#C9A84C]/40" />
                </div>
              )}

            </div>
          )
        })}
      </section>

      {/* ══════════════════════════════════════════════════════
          3.5 SENSORY BOTANICAL AROMA & OIL BAR
      ══════════════════════════════════════════════════════ */}
      <AromaOilBar />

      {/* ══════════════════════════════════════════════════════
          4. BOTTOM STRIP — 4 numbered process steps
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#2C2C2C] py-16 md:py-20 px-6">
        <FadeIn direction="up" delay={0.05}>
          <p
            className="text-center text-[#C9A84C] text-[10px] tracking-[0.35em] uppercase font-medium mb-10"
          >
            Your Journey With Us
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { step: '01', label: 'Choose', sub: 'Select the treatment that calls to you.' },
            { step: '02', label: 'Book',   sub: 'Reserve your sanctuary in seconds.'     },
            { step: '03', label: 'Arrive', sub: 'Be welcomed with warm Khmer hospitality.' },
            { step: '04', label: 'Transform', sub: 'Leave renewed in body and spirit.'   },
          ].map(({ step, label, sub }, i) => (
            <FadeIn key={step} direction="up" delay={i * 0.08} className="text-center">
              <p
                className="font-serif text-7xl md:text-8xl text-[#C9A84C]/20 leading-none mb-1 select-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {step}
              </p>
              <p
                className="font-serif text-2xl md:text-3xl text-[#FAF7F2] mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {label}
              </p>
              <p className="text-[#FAF7F2]/50 text-sm leading-relaxed">{sub}</p>
            </FadeIn>
          ))}
        </div>
      </section>

    </div>
  )
}

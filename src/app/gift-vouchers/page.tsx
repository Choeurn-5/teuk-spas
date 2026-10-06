"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { requestGiftVoucher } from "@/lib/vouchers/actions";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { LuxuryVoucherCertificate } from "@/components/vouchers/LuxuryVoucherCertificate";
import {
  Check,
  Gift,
  ArrowRight,
  Sparkles,
  Printer,
  Copy,
  MessageCircle,
  ShieldCheck,
  Heart,
  Package,
  Layers,
} from "lucide-react";

interface RitualPreset {
  id: string;
  name: string;
  duration: string;
  amount: number;
  description: string;
}

const ritualPresets: RitualPreset[] = [
  {
    id: "khmer-traditional",
    name: "Traditional Khmer Healing",
    duration: "60 Mins",
    amount: 42,
    description: "Centuries-old dry acupressure and assisted yoga stretching.",
  },
  {
    id: "jasmine-aroma",
    name: "Jasmine Aromatherapy Journey",
    duration: "90 Mins",
    amount: 68,
    description: "Warm night-harvested Angkor jasmine oil and rhythmic relaxation.",
  },
  {
    id: "herbal-compress",
    name: "Sacred Herbal Compress Sanctuary",
    duration: "90 Mins",
    amount: 75,
    description: "Steamed organic lemongrass, turmeric, and plai root poultices.",
  },
  {
    id: "couples-odyssey",
    name: "Couple's Lotus Harmonizing Odyssey",
    duration: "150 Mins",
    amount: 165,
    description: "VIP suite with lotus petal terrazzo bath and synchronized massage for two.",
  },
];

const occasions = [
  "Birthday Celebration",
  "Anniversary & Love",
  "Wedding & Honeymoon",
  "Deep Rest & Stress Relief",
  "Gratitude & Thank You",
];

export default function GiftVouchersPage() {
  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectionMode, setSelectionMode] = useState<"ritual" | "custom">("ritual");
  const [selectedRitualId, setSelectedRitualId] = useState<string>("jasmine-aroma");
  const [isDarkPreview, setIsDarkPreview] = useState(false);

  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    amount: "68",
    ritualName: "Jasmine Aromatherapy Journey (90 Mins)",
    occasion: "Deep Rest & Stress Relief",
    email: "",
    phone: "",
    message: "",
  });

  const handleSelectRitual = (ritual: RitualPreset) => {
    setSelectedRitualId(ritual.id);
    setFormData((prev) => ({
      ...prev,
      amount: String(ritual.amount),
      ritualName: `${ritual.name} (${ritual.duration})`,
    }));
  };

  const handleSelectCustomAmount = (amt: string) => {
    setFormData((prev) => ({
      ...prev,
      amount: amt,
      ritualName: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await requestGiftVoucher(formData);
    if (res.success && res.code) {
      setSuccessCode(res.code);
    }
    setLoading(false);
  };

  const handleCopyCode = () => {
    if (!successCode) return;
    navigator.clipboard.writeText(successCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#FAF7F2] text-[#141612] min-h-screen">
      {/* ─── 1. HERO — Full Viewport Luxury Ken Burns ─── */}
      <PageHero
        image="/images/spa_package.jpg"
        badge="✦ Digital & Physical Gift Certificates"
        scriptTag="The Art of Thoughtful Gifting"
        title="The Gift of"
        titleAccent="Pure Calm"
        description="Bestow the blessing of tranquil stillness. Valid across all traditional Khmer therapies, botanical oil rituals, and private couple sanctuaries for 6 months."
        heightClass="h-screen min-h-[750px] lg:min-h-[820px]"
        actions={{
          primary: { label: "Design Gift Certificate", href: "#voucher-studio" },
          secondary: { label: "Explore Treatments", href: "/treatments" },
        }}
      />

      {/* ─── 2. VOUCHER STUDIO SECTION ─── */}
      <section id="voucher-studio" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-7xl mx-auto w-full">
        {/* Studio Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A5240]/10 border border-[#4A5240]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#4A5240]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#4A5240] font-medium font-jost">
              Bespoke Sanctuary Certificates
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#141612] tracking-tight">
            Craft a Tailored Spa Gift
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#141612]/70 font-jost font-light leading-relaxed">
            Fill in your recipient details below. Watch your certificate render in real time with our official gold seal
            and authentic Siem Reap crest.
          </p>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Real-time Luxury Certificate Preview */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-[#4A5240] font-jost font-medium">
                Live Certificate Preview
              </span>

              {/* Theme Toggle for Preview */}
              <button
                type="button"
                onClick={() => setIsDarkPreview(!isDarkPreview)}
                className="inline-flex items-center gap-2 text-xs font-jost px-3 py-1.5 rounded-full border border-black/10 bg-white hover:bg-[#F5F0E8] transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>{isDarkPreview ? "Noir Gold Edition" : "Parchment Edition"}</span>
              </button>
            </div>

            {/* The Actual Certificate Component */}
            <div id="printable-certificate">
              <LuxuryVoucherCertificate
                code={successCode || "TEUK-PREVIEW-2026"}
                amount={formData.amount}
                recipientName={formData.recipientName}
                senderName={formData.senderName}
                message={formData.message}
                ritualName={formData.ritualName}
                occasion={formData.occasion}
                isDark={isDarkPreview}
              />
            </div>

            {/* Physical Box Gifting Notice */}
            <div className="p-5 rounded-2xl bg-white border border-black/8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center shrink-0 mt-0.5">
                <Package className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div className="text-xs font-jost leading-relaxed text-[#141612]/75 font-light">
                <strong className="font-serif text-sm font-medium text-[#141612] block mb-0.5">
                  Handcrafted Physical Gift Box Available
                </strong>
                Would you prefer a physical presentation? We can prepare our handcrafted mulberry paper & silk ribbon gift
                box for complimentary pick-up at our Siem Reap sanctuary reception.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Customization Form or Success State */}
          <div className="lg:col-span-6">
            {successCode ? (
              /* Success & Activation Guidance */
              <FadeIn delay={0.1}>
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/10 shadow-xl text-center space-y-6">
                  <div className="w-16 h-16 bg-[#4A5240]/10 border border-[#4A5240]/20 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-[#4A5240]" />
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#141612]">
                    Gift Certificate Requested!
                  </h3>

                  <p className="text-sm sm:text-base text-[#141612]/70 font-jost font-light leading-relaxed max-w-md mx-auto">
                    Your certificate has been generated and dispatched to our sanctuary concierge. To activate and finalize
                    payment, connect with us below:
                  </p>

                  {/* Highlighted Code Box */}
                  <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#C9A84C]/40 max-w-sm mx-auto">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#C9A84C] font-jost font-medium mb-1">
                      Official Certificate Code
                    </div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-[#141612] tracking-widest">
                      {successCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#4A5240] hover:text-[#141612] font-jost font-medium transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? "Code Copied to Clipboard!" : "Copy Voucher Code"}</span>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/85592888999?text=${encodeURIComponent(
                        `Hello Teuk Spa, I would like to finalize payment for my Gift Certificate: ${successCode} for ${formData.recipientName} ($${formData.amount}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-jost uppercase tracking-[0.15em] font-medium transition-all shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm via WhatsApp</span>
                    </a>

                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-black/15 hover:border-black/30 bg-white text-[#141612] text-xs sm:text-sm font-jost uppercase tracking-[0.15em] font-medium transition-colors"
                    >
                      <Printer className="w-4 h-4 text-[#C9A84C]" />
                      <span>Print Certificate</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#141612]/50 font-jost font-light pt-4 border-t border-black/5">
                    Accepted payment methods: ABA Pay, Bakong KHQR, International Credit Cards, or Cash at reception.
                  </p>
                </div>
              </FadeIn>
            ) : (
              /* Customization Form */
              <form
                onSubmit={handleSubmit}
                className="bg-white p-7 sm:p-10 rounded-3xl border border-black/8 shadow-xl space-y-7"
              >
                {/* 1. Value / Experience Selector */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-jost uppercase tracking-[0.18em] text-[#141612]/70 font-medium">
                      1. Choose Gift Experience
                    </label>

                    {/* Mode Toggle */}
                    <div className="inline-flex p-1 rounded-xl bg-[#FAF7F2] border border-black/8 text-xs font-jost">
                      <button
                        type="button"
                        onClick={() => setSelectionMode("ritual")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          selectionMode === "ritual"
                            ? "bg-[#141612] text-white font-medium shadow-sm"
                            : "text-[#141612]/60 hover:text-[#141612]"
                        }`}
                      >
                        Curated Rituals
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectionMode("custom")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          selectionMode === "custom"
                            ? "bg-[#141612] text-white font-medium shadow-sm"
                            : "text-[#141612]/60 hover:text-[#141612]"
                        }`}
                      >
                        Monetary Value
                      </button>
                    </div>
                  </div>

                  {/* Mode A: Curated Rituals */}
                  {selectionMode === "ritual" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ritualPresets.map((ritual) => {
                        const isSelected = selectedRitualId === ritual.id;
                        return (
                          <button
                            key={ritual.id}
                            type="button"
                            onClick={() => handleSelectRitual(ritual)}
                            className={`text-left p-4 rounded-2xl border transition-all ${
                              isSelected
                                ? "border-[#C9A84C] bg-[#FAF7F2] shadow-sm ring-1 ring-[#C9A84C]"
                                : "border-black/8 hover:border-black/20 bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-jost text-[#C9A84C] uppercase tracking-wider">
                                {ritual.duration}
                              </span>
                              <span className="font-serif text-lg text-[#141612] font-medium">
                                ${ritual.amount}
                              </span>
                            </div>
                            <div className="font-serif text-base text-[#141612] leading-snug mb-1">
                              {ritual.name}
                            </div>
                            <p className="text-[11px] text-[#141612]/60 font-jost line-clamp-2">
                              {ritual.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Mode B: Custom Amount */
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-2">
                        {["35", "50", "100", "200"].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => handleSelectCustomAmount(amt)}
                            className={`py-3 rounded-xl border text-sm font-jost font-medium transition-all ${
                              formData.amount === amt && !formData.ritualName
                                ? "bg-[#141612] text-white border-[#141612]"
                                : "bg-[#FAF7F2] border-black/8 text-[#141612] hover:border-[#C9A84C]"
                            }`}
                          >
                            ${amt}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-sm text-[#141612]/40 font-jost font-medium">$</span>
                        <input
                          type="number"
                          min="15"
                          max="1500"
                          placeholder="Or enter custom dollar amount"
                          value={formData.amount}
                          onChange={(e) => handleSelectCustomAmount(e.target.value)}
                          className="w-full pl-8 pr-4 py-3 bg-[#FAF7F2] border border-black/10 rounded-xl font-jost text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Occasion Tag Selection */}
                <div>
                  <label className="block text-xs font-jost uppercase tracking-[0.18em] text-[#141612]/70 font-medium mb-2">
                    2. Occasion (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((occ) => (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setFormData({ ...formData, occasion: occ })}
                        className={`px-3 py-1.5 rounded-full text-xs font-jost transition-all border ${
                          formData.occasion === occ
                            ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#141612] font-medium"
                            : "bg-[#FAF7F2] border-black/5 text-[#141612]/60 hover:border-black/20"
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Recipient & Sender Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-jost uppercase tracking-[0.18em] text-[#141612]/70 font-medium mb-1.5">
                      Recipient Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sothea Chamroeun"
                      value={formData.recipientName}
                      onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-black/10 rounded-xl font-jost text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-jost uppercase tracking-[0.18em] text-[#141612]/70 font-medium mb-1.5">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-black/10 rounded-xl font-jost text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
                    />
                  </div>
                </div>

                {/* 4. Personal Greeting Note */}
                <div>
                  <label className="block text-xs font-jost uppercase tracking-[0.18em] text-[#141612]/70 font-medium mb-1.5">
                    Personal Greeting Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Wishing you hours of deep peace and renewed spirit..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-black/10 rounded-xl font-jost text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A84C] resize-none"
                  />
                </div>

                {/* 5. Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-black/5">
                  <div>
                    <label className="block text-xs font-jost uppercase tracking-[0.18em] text-[#141612]/70 font-medium mb-1.5">
                      Your Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+855 12 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-black/10 rounded-xl font-jost text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-jost uppercase tracking-[0.18em] text-[#141612]/70 font-medium mb-1.5">
                      Your Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-black/10 rounded-xl font-jost text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A84C]"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#141612] hover:bg-[#C9A84C] text-[#FAF7F2] hover:text-[#141612] text-xs sm:text-sm font-jost uppercase tracking-[0.2em] font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <span>Issuing Sanctuary Certificate...</span>
                  ) : (
                    <>
                      <span>Issue & Reserve Certificate</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-6 text-[11px] text-[#141612]/50 font-jost">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" /> 6-Month Activation
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#C9A84C]" /> Instant Digital & Gift Box
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/lib/content/actions";
import { Check } from "lucide-react";

export function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [formData, setFormData] = useState({
    businessName: initialSettings.businessName || "",
    phone: initialSettings.phone || "",
    email: initialSettings.email || "",
    address: initialSettings.address || "",
    hoursDisplay: initialSettings.hoursDisplay || "",
    mapUrl: initialSettings.mapUrl || "",
    announcement: initialSettings.announcement || "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateSiteSettings(formData);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Failed to save settings.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink/80 mb-1">Phone Number / WhatsApp</label>
          <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 bg-white border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/80 mb-1">Email Address</label>
          <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 bg-white border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/80 mb-1">Physical Address</label>
        <textarea rows={2} required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 bg-white border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive" />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/80 mb-1">Opening Hours (Display Text)</label>
        <textarea rows={3} required value={formData.hoursDisplay} onChange={e => setFormData({...formData, hoursDisplay: e.target.value})} className="w-full px-4 py-2 bg-white border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive" />
        <p className="text-xs text-ink/50 mt-1">Example: Monday – Sunday\n10:00 AM – 10:00 PM</p>
      </div>

      <div className="pt-6 border-t border-mist/50 flex items-center justify-end">
        {saved && <span className="text-sm text-green-600 mr-4 flex items-center"><Check className="w-4 h-4 mr-1" /> Saved Successfully</span>}
        <button type="submit" disabled={loading} className="px-6 py-2.5 bg-olive text-cream rounded-xl text-sm font-medium hover:bg-gold transition-colors disabled:opacity-50">
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}

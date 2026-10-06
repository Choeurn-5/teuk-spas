"use client";

import { useState } from "react";
import { updateTreatment } from "@/lib/content/actions";
import { Check, Edit2, X } from "lucide-react";

export function EditTreatmentForm({ treatment }: { treatment: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: treatment.name,
    shortDescription: treatment.shortDescription || "",
    active: treatment.active ?? true,
    price: treatment.durationOptions?.[0]?.price || 0, // Simplified for demo
    minutes: treatment.durationOptions?.[0]?.minutes || 60,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // In reality, we'd manage the full durationOptions array
    const updatedData = {
      name: formData.name,
      shortDescription: formData.shortDescription,
      active: formData.active,
      durationOptions: [{ minutes: Number(formData.minutes), price: Number(formData.price) }]
    };

    const res = await updateTreatment(treatment.id, updatedData);
    if (res.success) {
      setIsEditing(false);
    } else {
      alert("Failed to save.");
    }
    setSaving(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-mist rounded-xl flex items-center justify-center text-xs text-sage border border-mist">
            Img
          </div>
          <div>
            <h3 className="text-lg font-medium text-olive flex items-center">
              {treatment.name}
              {!treatment.active && (
                <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  Hidden
                </span>
              )}
            </h3>
            <p className="text-sm text-ink/60 mt-1 max-w-lg truncate">{treatment.shortDescription}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-sm font-medium text-ink">${formData.price}</p>
            <p className="text-xs text-ink/60">{formData.minutes} min</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-ink/40 hover:text-olive hover:bg-mist rounded-full transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4 border-b border-mist pb-4">
        <h3 className="text-lg font-medium text-olive">Editing: {treatment.name}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-ink/60 hover:text-red-600 rounded-full transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="p-2 text-olive hover:text-white hover:bg-olive rounded-full transition-colors disabled:opacity-50"
            title="Save"
          >
            <Check className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink/80 mb-1">Treatment Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-mist rounded-lg focus:outline-none focus:ring-1 focus:ring-olive"
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-ink/80 mb-1">Minutes</label>
            <input
              type="number"
              value={formData.minutes}
              onChange={(e) => setFormData({ ...formData, minutes: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-mist rounded-lg focus:outline-none focus:ring-1 focus:ring-olive"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-ink/80 mb-1">Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-mist rounded-lg focus:outline-none focus:ring-1 focus:ring-olive"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-ink/80 mb-1">Short Description</label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-mist rounded-lg focus:outline-none focus:ring-1 focus:ring-olive"
          />
        </div>

        <div className="md:col-span-2 flex items-center">
          <input
            type="checkbox"
            id={`active-${treatment.id}`}
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="w-4 h-4 text-olive focus:ring-olive border-mist rounded"
          />
          <label htmlFor={`active-${treatment.id}`} className="ml-2 block text-sm text-ink/80">
            Visible to public
          </label>
        </div>
      </div>
    </div>
  );
}

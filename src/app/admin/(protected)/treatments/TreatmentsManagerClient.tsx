"use client";

import { useState } from "react";
import { updateTreatment } from "@/lib/content/actions";
import { addTreatment, deleteTreatment } from "@/lib/admin/actions";
import { Trash2, Edit2, X, Check, Plus, ChevronDown, ChevronUp } from "lucide-react";

export function TreatmentsManagerClient({ initialTreatments }: { initialTreatments: any[] }) {
  const [treatments, setTreatments] = useState(initialTreatments);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newTreatment, setNewTreatment] = useState({
    name: "", shortDescription: "", durationMinutes: 60, price: 20,
  });

  const [editData, setEditData] = useState<any>(null);

  const startEdit = (t: any) => {
    setEditingId(t.id);
    setEditData({
      name: t.name,
      shortDescription: t.shortDescription,
      active: t.active,
      minutes: t.durationOptions?.[0]?.minutes || 60,
      price: t.durationOptions?.[0]?.price || 0,
    });
  };

  const handleSave = async (id: string) => {
    setLoading(true);
    const res = await updateTreatment(id, {
      name: editData.name,
      shortDescription: editData.shortDescription,
      active: editData.active,
      durationOptions: [{ minutes: Number(editData.minutes), price: Number(editData.price) }],
    });
    if (res.success) {
      setTreatments(prev => prev.map(t => t.id === id ? { ...t, ...editData, durationOptions: [{ minutes: Number(editData.minutes), price: Number(editData.price) }] } : t));
      setEditingId(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setLoading(true);
    const res = await deleteTreatment(id);
    if (res.success) {
      setTreatments(prev => prev.filter(t => t.id !== id));
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await addTreatment(newTreatment);
    if (res.success) {
      setTreatments(prev => [...prev, {
        id: Date.now().toString(),
        ...newTreatment,
        durationOptions: [{ minutes: newTreatment.durationMinutes, price: newTreatment.price }],
        active: true,
        order: prev.length,
      }]);
      setNewTreatment({ name: "", shortDescription: "", durationMinutes: 60, price: 20 });
      setShowAddForm(false);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-olive text-cream text-sm font-medium rounded-xl hover:bg-gold transition-colors"
        >
          {showAddForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showAddForm ? "Cancel" : "Add Treatment"}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white border-2 border-olive/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-serif text-xl text-olive">New Treatment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Treatment Name *</label>
              <input required type="text" value={newTreatment.name} onChange={e => setNewTreatment({...newTreatment, name: e.target.value})} className="w-full px-3 py-2 border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive" placeholder="e.g. Deep Tissue Massage" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-ink/80 mb-1">Duration (min) *</label>
                <input required type="number" value={newTreatment.durationMinutes} onChange={e => setNewTreatment({...newTreatment, durationMinutes: Number(e.target.value)})} className="w-full px-3 py-2 border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-ink/80 mb-1">Price ($) *</label>
                <input required type="number" value={newTreatment.price} onChange={e => setNewTreatment({...newTreatment, price: Number(e.target.value)})} className="w-full px-3 py-2 border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink/80 mb-1">Short Description *</label>
              <textarea required rows={2} value={newTreatment.shortDescription} onChange={e => setNewTreatment({...newTreatment, shortDescription: e.target.value})} className="w-full px-3 py-2 border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive" placeholder="A short, enticing description for the public menu..." />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-olive text-cream rounded-xl text-sm font-medium hover:bg-gold transition-colors disabled:opacity-50">
              {loading ? "Saving..." : "Add Treatment"}
            </button>
          </div>
        </form>
      )}

      {/* Treatments List */}
      <div className="bg-warm rounded-2xl border border-mist shadow-sm overflow-hidden">
        <ul className="divide-y divide-mist">
          {treatments.map(t => (
            <li key={t.id} className="p-6">
              {editingId === t.id ? (
                // EDIT MODE
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink/60 mb-1 uppercase tracking-widest">Name</label>
                      <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full px-3 py-2 border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive bg-white" />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-ink/60 mb-1 uppercase tracking-widest">Minutes</label>
                        <input type="number" value={editData.minutes} onChange={e => setEditData({...editData, minutes: e.target.value})} className="w-full px-3 py-2 border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-ink/60 mb-1 uppercase tracking-widest">Price $</label>
                        <input type="number" value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} className="w-full px-3 py-2 border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive bg-white" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-ink/60 mb-1 uppercase tracking-widest">Short Description</label>
                      <textarea rows={2} value={editData.shortDescription} onChange={e => setEditData({...editData, shortDescription: e.target.value})} className="w-full px-3 py-2 border border-mist rounded-xl focus:outline-none focus:ring-1 focus:ring-olive bg-white" />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id={`active-${t.id}`} checked={editData.active} onChange={e => setEditData({...editData, active: e.target.checked})} className="w-4 h-4 text-olive rounded" />
                      <label htmlFor={`active-${t.id}`} className="ml-2 text-sm text-ink/80">Visible to public</label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm text-ink/60 hover:text-ink rounded-xl border border-mist hover:bg-mist transition-colors">Cancel</button>
                    <button onClick={() => handleSave(t.id)} disabled={loading} className="px-4 py-2 text-sm bg-olive text-cream rounded-xl hover:bg-gold transition-colors disabled:opacity-50 flex items-center">
                      <Check className="w-4 h-4 mr-1" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                // VIEW MODE
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-xl text-olive">{t.name}</h3>
                      {!t.active && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded font-medium">Hidden</span>}
                    </div>
                    <p className="text-sm text-ink/60 font-light mb-1 max-w-lg">{t.shortDescription}</p>
                    <p className="text-xs text-gold font-medium tracking-widest uppercase">
                      {t.durationOptions?.[0]?.minutes}min · ${t.durationOptions?.[0]?.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <button onClick={() => startEdit(t)} className="p-2 text-ink/40 hover:text-olive rounded-xl hover:bg-mist transition-colors" title="Edit">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(t.id, t.name)} disabled={loading} className="p-2 text-ink/40 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

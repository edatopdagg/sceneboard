"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewItem() {
  const r = useRouter();
  const [f, setF] = useState({
    title: "",
    description: "",
    amount: 0,
    genre: "drama",
    durationMin: 5,
    tags: "",
  });
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          amount: Number(f.amount),
          durationMin: Number(f.durationMin),
          tags: f.tags, // SQLite: string
        }),
      });
      const item = await res.json();
      r.push(`/items/${item.id}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Yeni Öneri</h2>
      <form onSubmit={submit} className="card p-6 space-y-5">
        <div>
          <div className="label">Başlık</div>
          <input className="input" placeholder="Örn. Karanlık Koridor" value={f.title}
                 onChange={(e) => setF({ ...f, title: e.target.value })} required />
        </div>
        <div>
          <div className="label">Açıklama</div>
          <textarea className="input min-h-28" placeholder="Kısa konu/amaç…" value={f.description}
                    onChange={(e) => setF({ ...f, description: e.target.value })} required />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <div className="label">Tür (genre)</div>
            <input className="input" value={f.genre}
                   onChange={(e) => setF({ ...f, genre: e.target.value })} />
          </div>
          <div>
            <div className="label">Süre (dk)</div>
            <input type="number" className="input" value={f.durationMin as any}
                   onChange={(e) => setF({ ...f, durationMin: Number(e.target.value) })} />
          </div>
          <div>
            <div className="label">Bütçe</div>
            <input type="number" className="input" value={f.amount as any}
                   onChange={(e) => setF({ ...f, amount: Number(e.target.value) })} />
          </div>
        </div>

        <div>
          <div className="label">Etiketler</div>
          <input className="input" placeholder="virgül ile: festival, experimental"
                 value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} />
        </div>

        <div className="flex items-center justify-end gap-2">
          <a href="/" className="btn-ghost">İptal</a>
          <button className="btn" disabled={saving}>
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </form>
    </section>
  );
}

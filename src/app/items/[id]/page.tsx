"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const statusList = ["NEW", "IN_REVIEW", "REJECTED", "APPROVED"] as const;
const statusColor = (s: string) =>
  s === "APPROVED" ? "bg-green-300/20 text-green-300" :
  s === "REJECTED" ? "bg-red-300/20 text-red-300" :
  s === "IN_REVIEW" ? "bg-amber-300/20 text-amber-300" :
  "bg-gray-300/20 text-gray-300";

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const [it, setIt] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const r = await fetch(`/api/items/${id}`);
    setIt(await r.json());
  };
  useEffect(() => { load(); }, [id]);

  const setStatus = async (status: string) => {
    setSaving(true);
    await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
    setSaving(false);
  };

  const recalcScore = async () => {
    setSaving(true);
    const res = await fetch(`/api/score/${id}`, { method: "POST" });
    const data = await res.json();
    setIt(data);
    setSaving(false);
  };

  if (!it) return <div className="card p-8 text-sm text-[rgb(var(--muted))]">Yükleniyor…</div>;

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{it.title}</h2>
          <div className="text-sm text-[rgb(var(--muted))]">
            {it.genre} • {it.durationMin} dk • Bütçe: {it.amount}
          </div>
        </div>
        <span className={`badge ${statusColor(it.status)}`}>{it.status}</span>
      </div>

      <div className="flex gap-2">
        <button onClick={recalcScore} className="btn" disabled={saving}>
          {saving ? "Hesaplanıyor…" : "Skoru Güncelle"}
        </button>
        <a href="/" className="btn-ghost">← Listeye dön</a>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-5 lg:col-span-2"
        >
          <div className="label">Açıklama</div>
          <p className="whitespace-pre-wrap leading-relaxed">{it.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card p-5 space-y-4"
        >
          <div>
            <div className="label">Risk skoru</div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-semibold">{it.risk_score}</div>
            </div>
            <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-[rgb(var(--primary))]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, it.risk_score))}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          <div>
            <div className="label">Etiketler</div>
            <div className="flex flex-wrap gap-2">
              {(String(it.tags || "")
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean) as string[]).map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              {!it.tags && <span className="text-sm text-[rgb(var(--muted))]">—</span>}
            </div>
          </div>

          <div>
            <div className="label mb-2">Durumu değiştir</div>
            <div className="flex flex-wrap gap-2">
              {statusList.map((s) => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStatus(s)}
                  disabled={saving}
                  className={`btn ${s === it.status ? "opacity-90 ring-2 ring-[rgb(var(--ring))]/40" : ""}`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

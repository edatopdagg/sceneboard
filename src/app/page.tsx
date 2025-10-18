"use client";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  title: string;
  genre: string;
  durationMin: number;
  risk_score: number;
  status: string;
 
};

const statusColor = (s: string) =>
  s === "APPROVED" ? "bg-green-100 text-green-700" :
  s === "REJECTED" ? "bg-red-100 text-red-700" :
  s === "IN_REVIEW" ? "bg-amber-100 text-amber-700" :
  "bg-gray-100 text-gray-700";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/items");
      const data = await r.json();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Öneriler</h1>
          <p className="text-sm text-[rgb(var(--muted))]">Eklediğin bütün sahne/film önerileri burada.</p>
        </div>
        <a className="btn" href="/items/new">+ Yeni Öneri</a>
      </div>

      {loading ? (
        <div className="card p-8 text-sm text-[rgb(var(--muted))]">Yükleniyor…</div>
      ) : items.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="text-lg font-medium">Henüz öğe yok</div>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">İlk önerini ekleyerek başla.</p>
          <a className="btn mt-4 inline-flex" href="/items/new">+ Yeni Öneri</a>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <a key={it.id} href={`/items/${it.id}`} className="card p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold line-clamp-1">{it.title}</h3>
                <span className={`badge ${statusColor(it.status)}`}>{it.status}</span>
              </div>
              <div className="mt-2 text-sm text-[rgb(var(--muted))]">
                {it.genre} • {it.durationMin} dk
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Risk skoru</span>
                  <span className="font-semibold">{it.risk_score}</span>
                </div>
                <div className="h-2 bg-black/10 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-[rgb(var(--primary))]"
                    style={{ width: `${Math.max(0, Math.min(100, it.risk_score))}%` }}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

# 🎬 SceneBoard (Lite)

Kısa film / sahne önerilerini toplayıp **risk skoruna** göre değerlendiren minimal bir uygulama.  
**Next.js App Router + Prisma + (Neon/Postgres veya lokal SQLite) + Tailwind + Framer Motion**

## ✨ Özellikler
- Öneri CRUD (Liste, Detay, Yeni Ekle)
- **Basit kural motoru** ile dinamik **risk skoru** (0–100)
- Durum yönetimi: `NEW`, `IN_REVIEW`, `REJECTED`, `APPROVED`
- Modern **Dark/Light** tema (varsayılan **Dark**, toggle ile değişir)
- Küçük animasyonlar (kartlar, geçişler, barlar)

## 🧱 Teknolojiler
- Next.js 15 (App Router)
- Prisma ORM
- Tailwind CSS (v4)
- Framer Motion
- DB: **Neon (Postgres)** veya lokal **SQLite** (dev)

## 🚀 Hızlı Başlangıç (Lokal)
```bash
# bağımlılıklar
npm i


# şema/migrasyon
npx prisma migrate dev --name init
npx prisma generate

# çalıştır
npm run dev
# http://localhost:3000

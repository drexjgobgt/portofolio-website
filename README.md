# Portofolio Rafif Syandana

Situs portofolio satu halaman untuk **Rafif Syandana**, software dan web developer dari Medan. Dibangun dengan HTML, CSS, dan JavaScript murni — tanpa framework, tanpa build step, tanpa dependensi runtime.

[Live site](https://rafsyan.vercel.app) · [GitHub](https://github.com/drexjgobgt) · [LinkedIn](https://www.linkedin.com/in/rafif-syandana-84302a367/)

![Portofolio Rafif Syandana — desktop](assets/readme/preview-desktop.png)

## Karya

Enam proyek unggulan ditampilkan dengan filter kategori:

- **SIPW** — sistem informasi pengaduan warga
- **Mini CRM** — CRM untuk UMKM
- **ClipFlow** — instant replay Windows berbasis Rust/Tauri
- **Toko Gas UMKM** — e-commerce distributor dengan Midtrans/QRIS
- **Kunang-Kunang** — bot musik Discord yang dikendalikan dari live chat TikTok
- **handTracker3Dvoxel** — eksperimen computer vision di browser

![Bagian karya](assets/readme/preview-work.png)

## Fitur

- Hero ilustrasi senja dengan parallax halus dan sorotan mengikuti kursor
- Jam WIB langsung di hero, kartu tentang, dan footer
- Filter proyek dengan `aria-pressed`
- Tombol salin alamat GitHub dengan feedback toast
- Navigasi mobile berbentuk sheet
- Scroll progress bar dan reveal berjenjang
- Seluruh animasi menghormati `prefers-reduced-motion`

<p align="center">
  <img src="assets/readme/preview-mobile.png" alt="Tampilan mobile portofolio" width="320">
</p>

## Struktur

```text
portfolio/
├─ index.html          # struktur halaman + metadata
├─ style.css           # design system, komponen, animasi
├─ app.js              # data proyek, filter, jam, parallax, clipboard
└─ assets/
   ├─ hero.svg         # ilustrasi senja
   ├─ og.png           # preview share 1200×630
   ├─ grain.svg
   ├─ brand/           # mark dan avatar
   └─ projects/        # enam thumbnail SVG
```

Screenshot README berada di `assets/readme/` dan tidak termasuk deployment.

## Menjalankan lokal

Buka `portfolio/index.html` langsung di browser, atau jalankan server lokal dari root repo:

```powershell
python -m http.server 5500
# lalu buka http://localhost:5500/portfolio/
```

Font diambil dari Google Fonts. Saat offline, halaman tetap berjalan dengan font fallback sistem.

## Deploy

Situs ini di-deploy ke Vercel sebagai project **rafsyan** dengan root directory `portfolio`.

```sh
vercel deploy --prod
```

Domain produksi: **https://rafsyan.vercel.app**

## Data & aset

- Data proyek dan tautan repositori bersumber dari GitHub [`drexjgobgt`](https://github.com/drexjgobgt).
- Profil profesional merujuk ke [LinkedIn Rafif Syandana](https://www.linkedin.com/in/rafif-syandana-84302a367/).
- Hero, mark, avatar, thumbnail proyek, dan gambar OG dibuat sebagai SVG melalui 9Router.
- Tipografi: Familjen Grotesk, Instrument Serif, dan JetBrains Mono melalui Google Fonts.

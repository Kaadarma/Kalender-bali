# Kalabali

Aplikasi kalender Bali interaktif berbasis web — offline-friendly, tanpa backend.

Menampilkan kalender Masehi dengan informasi **Pawukon** (wuku), **Purnama**, **Tilem**, **Galungan**, dan **Kuningan** dalam satu tampilan.

## Fitur

- **Kalender Bulanan** — navigasi bulan/tahun (2000–2100), grid 7 kolom
- **Pawukon** — perhitungan 30 wuku (siklus 210 hari) otomatis
- **Purnama & Tilem** — perhitungan astronomi posisi Bulan-Matahari, ditandai dot merah/hitam di sel tanggal
- **Galungan & Kuningan** — siklus 210 hari dari anchor yang terverifikasi
- **Info Wuku** — bar info wuku di header + banner detail saat klik tanggal
- **Dark Mode** — toggle di header, persistensi localStorage, fallback ke system preference
- **Sidebar** — collapsible (desktop), drawer dengan overlay (mobile), navigasi menu dan daftar upacara mendatang
- **Responsive** — mobile-first, MobileTopBar fixed, grid card bento di desktop
- **Offline** — semua perhitungan di frontend, tanpa API server

## Tech Stack

- **Vite** + **React 19**
- **Tailwind CSS v4** (CSS-first config via `@theme`)
- **Material Symbols** (icon font)
- **Google Fonts** — Plus Jakarta Sans, Hanken Grotesk

## Cara Install & Jalankan

```bash
npm install
npm run dev
```

Akses di `http://localhost:5173`.

## Build Produksi

```bash
npm run build
```

Hasil build di folder `dist/`, siap di-deploy ke static hosting apa pun.

## Struktur Proyek

```
src/
├── api/calendar.js        # wrapper fungsi lokal (Promise)
├── components/
│   ├── App.jsx            # root, state, routing navigasi
│   ├── BentoCards.jsx     # kartu countdown ritual (desktop)
│   ├── CalendarGrid.jsx   # grid kalender + dot Purnama/Tilem
│   ├── CalendarHeader.jsx # header + navigasi + dark mode
│   ├── MobileRitualList.jsx # daftar ritual (mobile)
│   ├── MobileTopBar.jsx   # top bar fixed (mobile)
│   └── Sidebar.jsx        # sidebar navigasi + upacara mendatang
├── utils/
│   ├── pawukon.js         # engine wuku, galungan, lunar phases
│   └── calendar.js        # generateMonthGrid, getTodayData
├── index.css              # Tailwind v4 @theme + dark mode
└── main.jsx
```

## Perhitungan Astronomi

Purnama dan Tilem dihitung menggunakan algoritma posisi Matahari dan Bulan (VSOP87/ELP-2000 truncated series), bukan siklus rata-rata tetap. Akurasi ±1 hari untuk beberapa tanggal — dapat ditingkatkan dengan ephemeris penuh.

Anchor yang digunakan:
- Wuku: 18 Desember 2023 = Sinta
- Galungan: 28 Februari 2024
- Purnama: 25 Januari 2024

## Lisensi

MIT

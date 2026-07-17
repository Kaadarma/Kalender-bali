# Agent Instructions: Balinese Stitch Calendar

You are an expert full-stack developer and UI/UX designer tasking with building the **Balinese Stitch Calendar** web application. Your goal is to create a clean, minimalist, highly responsive calendar that combines Google Calendar's functionality with a warm Balinese aesthetic and custom Stitch theme accents.

---

## 📌 Project Overview
- **Title:** Balinese Stitch Calendar
- **Project ID:** 5255200807156162416
- **Primary Goal:** Build an intuitive monthly calendar displaying Balinese holy days (Galungan, Kuningan, Purnama, Tilem) with an adorable Stitch-inspired visual theme.

## 📺 Target Screens & Assets
You must download and inspect the layout design/assets from the hosted project screen before generating the code base.

### 1. Screen 1: Nirmala Balinese Calendar - Desktop
- **Screen ID:** `0b56b02d602b4f1799e25d09a3002025`
- **Action Required:** Use a utility like `curl -L` to download the hosted layout/assets mapping associated with this Screen ID into the frontend assets directory.

---

## 🛠️ Tech Stack & Structural Rules

### 1. Frontend Architecture (React.js + Tailwind CSS v4)
- **Framework:** React (Vite-based architecture located in the `frontend/` directory).
- **Styling Configuration:** Tailwind CSS v4 integrated via `@tailwindcss/postcss` inside `postcss.config.js`. Do not revert to native legacy Tailwind plugins.
- **Responsiveness Rule:** 
  - **Desktop View (>=768px):** Split-screen layout. Left sidebar (30% width) for today's dynamic info, Wuku badge, Stitch avatar placeholder, and upcoming holiday list. Right grid (70% width) for the dynamic month view grid.
  - **Mobile View (<768px):** Fluid vertical stack layout. Sidebar transforms into a compact horizontal top bar header. Calendar elements must scale beautifully for touch interactions.

### 2. Backend Architecture (Node.js + Express)
- **Purpose:** Mathematical engine for calculating constant 210-day Pawukon cycle variations and modular lookup indexes for lunar-based Purnama/Tilem equations.
- **Backend Rule:** Galungan calculations must follow strict incremental math loops based on fixed 210-day cycles from verified anchor dates.
- **Output Standard:** Pure JSON API structures.

---

## 🎨 Theme & Visual Style Guide (Stitch x Bali)
- **Core Aesthetic:** Minimalist, generous whitespace, soft drop-shadows (`shadow-sm`), rounded nodes (`border-radius: 12px/16px`).
- **Color Palettes (Tailwind v4 Extend mapping):**
  - Sidebar & Main Accents: Soft Pastel Blue (`stitch-blue: #eef5fc`) mirroring Stitch's traits.
  - Galungan Day: Subtly highlighted with a soft red round badge background (`galungan-red: #ff7675`).
  - Kuningan Day: Highlighted with a warm, soft gold-yellow badge background (`kuningan-yellow: #ffeaa7`).
  - Purnama Day: Bordered or glowing ring element with an aesthetic white-yellow tint (`purnama-gold: #fdcb6e`).

---

## 🔄 Step-by-Step Implementation Workflow
1. **Asset Retrieval:** Fetch visual assets using the provided Screen ID via curl.
2. **Backend Engine Setup:** Create the Node.js server to handle date filtering math (Galungan = Anchor Date + 210n).
3. **Frontend Component Isolation:** Build reusable component blocks (`SidebarInfo.jsx`, `CalendarGrid.jsx`, `HolidayList.jsx`).
4. **Integration:** Connect the frontend fetch method to ingest the local backend API server responses securely.
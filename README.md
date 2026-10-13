# 🎮 GabutQuest — Teman Gabut Anak Magang

Aplikasi hiburan interaktif dan gamifikasi misi harian gratis untuk anak magang di seluruh Indonesia! Dibuat khusus untuk mengusir rasa bosan di sela-sela jam kerja, tanpa perlu login, ringan dibuka lewat HP maupun laptop, dan siap dibagikan ke teman satu grup.

---

## 🌟 Fitur Utama

- 🎲 **Generator Misi Acak**: Dapatkan misi seru dari 5 kategori berbeda:
  - 🎮 **Mini Game** (Dilengkapi game mini interaktif: Tes Kecepatan Refleks Alt+Tab, Spam Klik Deadline, Tebak Kata Acak, hingga Mode Relaksasi Napas Zen).
  - 🧠 **Tebak-tebakan** (Plesetan kocak & teka-teki logika dunia kerja dengan tombol spoiler *Buka Jawaban*).
  - 🎨 **Tantangan Kreatif** (Doodle sticky note, karikatur bos, hingga haiku tanggal tua).
  - 💻 **Ide Proyek** (Eksperimen mini dev tools, console matrix effect, kalkulator waktu pulang).
  - 🤝 **Tantangan Bareng Teman** (Misi ice-breaker konyol untuk dicoba bareng sesama rekan magang).
- 🏆 **Sistem Gamifikasi & Level**: Kumpulkan poin XP dari setiap misi yang diselesaikan. Naikkan tingkatan levelmu dari:
  - *Lv 1: Anak Bawang Baru Masuk*
  - *Lv 2: Pengamat Mesin Fotokopi*
  - *Lv 3: Pejuang Absen Tepat Waktu*
  - *Lv 4: Master Pura-Pura Sibuk*
  - *Lv 5: Duta Kopi & Gorengan*
  - *Lv 6: Sepuh Magang Santuy*
  - *Lv 7: Bayangan CEO Gabut*
- ⭐ **Daftar Favorit**: Simpan misi-misi favoritmu untuk dimainkan nanti.
- 📜 **Riwayat Misi**: Catat semua quest yang telah berhasil kamu selesaikan beserta riwayat XP dan waktu pengerjaan.
- 🚀 **Bagikan Misi**: Kirim misi ke grup obrolan (WhatsApp/Telegram/Slack) via **Web Share API** atau otomatis salin teks rapi ke Clipboard.
- 💾 **Penyimpanan Lokal Mandiri (`localStorage`)**: Poin, level, favorit, dan riwayat tetap tersimpan di browser perangkatmu tanpa backend atau database berbayar.
- 🔄 **Reset Progres**: Tombol reset aman dengan modal dialog konfirmasi jika ingin mengulang perjalanan magang dari nol.
- 📱 **Mobile First & Responsif**: Tampilan gaming modern dengan Bottom Navigation bar di HP dan Header Nav di desktop.

---

## 🛠️ Teknologi yang Digunakan

- **React 19** + **Vite 8**
- **JavaScript (ES Modules)**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (Ikon UI)
- **Canvas Confetti** (Animasi selebrasi)

---

## 🚀 Cara Menjalankan di Komputer Lokal

1. Buka folder proyek di terminal / Command Prompt:
   ```bash
   cd gabutquest
   ```
2. Pastikan dependensi sudah terpasang:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
4. Buka tautan lokal yang muncul (biasanya `http://localhost:5173`) di browsermu.

---

## 🌐 Panduan Deployment ke Vercel via GitHub

Aplikasi ini 100% kompatibel dengan hosting gratis **Vercel** tanpa membutuhkan konfigurasi database atau server tambahan.

### Langkah 1: Push Proyek ke GitHub
1. Pastikan Anda berada di direktori proyek `gabutquest`.
2. Inisialisasi git dan buat commit awal:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi aplikasi GabutQuest"
   ```
3. Buat repositori baru di [GitHub](https://github.com/new) bernama `gabutquest`.
4. Hubungkan repositori lokal ke GitHub dan lakukan push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<username-github-kamu>/gabutquest.git
   git push -u origin main
   ```

### Langkah 2: Import & Deploy di Vercel
1. Buka situs [Vercel](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Cari dan pilih repositori `gabutquest` yang baru saja Anda push, lalu klik **"Import"**.
4. Pengaturan build di Vercel akan otomatis mendeteksi konfigurasi:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **"Deploy"**.
6. Dalam hitungan detik, website publik Anda siap dan memiliki link aktif (misalnya `https://gabutquest.vercel.app`) yang bisa langsung Anda bagikan ke grup teman magang!

---

## 📁 Struktur Direktori

```
gabutquest/
├── index.html                # Template HTML & Font Jakarta Sans
├── vercel.json               # Konfigurasi rewrite SPA untuk Vercel
├── package.json              # Dependensi React, Vite, Tailwind, Lucide
├── vite.config.js            # Konfigurasi bundler Vite + Tailwind plugin
├── src/
│   ├── main.jsx              # Titik masuk utama React
│   ├── App.jsx               # Layout utama & navigasi tab
│   ├── index.css             # Konfigurasi Tailwind CSS v4 & tema gelap
│   ├── data/
│   │   ├── categories.js     # Data 5 kategori misi
│   │   ├── levels.js         # Data peringkat level & kalkulasi XP
│   │   └── missions.js       # Database 40+ misi gabut anak magang
│   ├── context/
│   │   └── GameContext.jsx   # State management & sinkronisasi localStorage
│   ├── utils/
│   │   ├── storage.js        # Helper aman membaca & menulis localStorage
│   │   ├── confetti.js       # Efek animasi kembang api perayaan
│   │   └── share.js          # Web Share API & clipboard fallback
│   └── components/
│       ├── Navbar.jsx        # Header desktop dengan level badge
│       ├── BottomNav.jsx     # Navigasi bawah khusus smartphone
│       ├── HeroBanner.jsx    # Sapaan dinamis waktu & kutipan magang
│       ├── MissionCard.jsx   # Kartu misi aktif & aksi
│       ├── InteractiveWidgets.jsx # Mini game (Refleks, Clicker, Scramble, Riddle)
│       ├── CategoryView.jsx  # Penjelajah kategori & fitur pencarian
│       ├── FavoritesView.jsx # Daftar misi yang disimpan
│       ├── ProgressView.jsx  # Kartu level, tangga karier, & riwayat selesai
│       ├── Toast.jsx         # Notifikasi feedback interaktif
│       └── ConfirmModal.jsx  # Dialog konfirmasi reset data
```

## Nama: Movie Mania Mantap
Jenis Aplikasi: Movie catalog app (mirip mini IMDb)

# Fitur                 
1. 🔍 **Search Film**          : Cari film berdasarkan judul (default tahun 2025)                
2. 📋 **Watchlist**            : Simpan film yang ingin ditonton                                 
3. ✅ **Watched List**         : Tandai film yang sudah ditonton                                 
4. 📴 **Offline Mode**         : Bisa menambahkan film meski offline, data disimpan di IndexedDB 
5. 🌐 **Status Online/Offline**: Deteksi jaringan dan tampilkan status                           
6. 🧾 **Movie Detail Modal**   : Modal dengan data detail + form feedback rating & komentar      
7. 💾 **Feedback User**        : Simpan komentar + rating lokal di localStorage                  


# Tech Stack:

  ⚛️ ReactJS (Frontend framework)
  📦 IndexedDB via idb (untuk penyimpanan offline)
  🌐 OMDb API (sumber data film)
  💾 LocalStorage (untuk watchlist & feedback)
  📡 Service Worker + online/offline detection
  💅 CSS custom (dengan Bootstrap)

In the project directory, you can run:

### Struktur Program

Struktur Utama Proyek

movie-mania-mantap/
├── public/
│   └── index.html
├── src/
│   ├── assets/                  → Gambar/icon
│   ├── components/
│   │   ├── MovieCard.jsx        → Kartu film (thumbnail + aksi)
│   │   ├── MovieDetailModal.jsx → Modal detail film + feedback
│   │   └── SearchBar.jsx        → Input pencarian film
│   ├── pages/
│   │   ├── HomePage.jsx         → Halaman utama dan sidebar
│   ├── services/
│   │   ├── indexedDB.js         → Fungsi simpan offline (IndexedDB)
│   │   └── storage.js           → Fungsi localStorage (watchlist/watched)
│   ├── App.js                   → Routing utama
│   ├── index.js                 → Root React
│   └── App.css / SidebarList.css / MovieDetailModal.css → Styling
├── package.json
└── README.md

# Alur Kerja Aplikasi
User Buka Aplikasi → Default Search "2025" → Ambil data dari OMDb API
↓
Tampil daftar Movie → Klik satu Movie → Muncul Modal
↓
User bisa Add to Watchlist / Mark as Watched
↓
Feedback Rating + Komentar
↓
Jika Offline → Data tetap disimpan ke IndexedDB dan disinkronkan saat Online


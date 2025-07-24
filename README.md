# 🎬 Movie Mania Mantap

Movie Mania Mantap adalah aplikasi katalog film berbasis ReactJS yang memungkinkan pengguna mencari informasi film, menambahkan film ke **Watchlist**, menandai film sebagai **Watched**, dan memberikan feedback seperti rating dan komentar. Aplikasi ini juga mendukung **offline mode** menggunakan IndexedDB.


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
<img width="752" height="604" alt="gambar" src="https://github.com/user-attachments/assets/170f7e37-4121-4545-be4d-a499af18b659" />


# Alur Kerja Aplikasi
1. User Buka Aplikasi → Default Search "2025" → Ambil data dari OMDb API
2. Tampil daftar Movie → Klik satu Movie → Muncul Modal
3. User bisa Add to Watchlist / Mark as Watched
4. Feedback Rating + Komentar
5. Jika Offline → Data tetap disimpan ke IndexedDB dan disinkronkan saat Online

## 🚀 Instalasi dan Menjalankan Proyek

1. Clone Repository

bash
git clone https://github.com/RizaruAbdulhadi/movie-mania-mantap.git
cd movie-mania-mantap

2. Install Dependencies

bash
npm install

3. Jalankan Aplikasi

bash
npm start

4. Build untuk Produksi

bash
npm run build


## Aplikasi ini menggunakan OMDb API. Untuk mengganti API key, edit file HomePage.jsx:

const API_KEY = 'bd1056a1'; // Ganti sesuai kebutuhan


🙋‍♂️ Pengembang

Made by Febrizal Abdul Hadi Suparmo

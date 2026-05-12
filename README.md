<div align="center">
<h1> Next.js JS Boilerplate </h1>
Boilerplate Next.js yang ringan menggunakan <strong>JavaScript (JSX)</strong> alih-alih TypeScript, dioptimalkan untuk prototyping cepat dan pengujian kilat.
</div>

## Mengapa JSX daripada TypeScript?

Boilerplate ini menggunakan `.jsx` untuk komponen React dan `.js` untuk file utilitas/logika. Alasannya:

- **Pengembangan Lebih Cepat**: Tidak perlu memeriksa tipe satu per satu saat prototyping cepat
- **Pengujian Kilat**: Sempurna untuk bereksperimen dengan ide-ide baru tanpa batasan tipe
- **Pemisahan yang Jelas**: `.jsx` untuk komponen (mengembalikan JSX), `.js` untuk logika murni
- **Ramah untuk Pemula**: Lebih mudah bagi pemula untuk fokus pada konsep React terlebih dahulu

> **Catatan**: Untuk aplikasi produksi dengan tim besar, TypeScript tetap direkomendasikan!

## Teknologi yang Digunakan

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Package Manager**: [pnpm](https://pnpm.io)
- **Kualitas Kode**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Konvensi Commit**: Commitlint (Conventional Commits)

## Cara Memulai

### 1. Clone atau Unduh Repositori

```bash
# Clone repositori
git clone https://github.com/hilmifawwazsaad/NextJS-js-Boilerplate
cd nexjs-jsx-boilerplate

# Atau unduh ZIP dan ekstrak
```

### 2. Instal Dependensi

```bash
pnpm install
```

### 3. Jalankan Server Development

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

### 4. Skrip yang Tersedia

```bash
# Development
pnpm dev              # Jalankan server development
pnpm build            # Build untuk produksi
pnpm start            # Jalankan server produksi

# Kualitas Kode
pnpm lint             # Jalankan ESLint
pnpm lint:strict      # ESLint dengan maks 0 peringatan
pnpm lint:fix         # Perbaiki otomatis error ESLint
pnpm format:write     # Format dengan Prettier
pnpm format:check     # Periksa pemformatan
pnpm format           # Format + Lint + Strict check (semua sekaligus)
```

## Konvensi Penamaan File

- **`.jsx`** — Komponen React yang mengembalikan JSX
- **`.js`** — JavaScript murni (utils, services, helpers)
- **`.css`** — Stylesheet

## Pengaturan Kualitas Kode

### Auto-format saat Simpan

Proyek ini menggunakan Prettier + ESLint dengan auto-formatting:

- **Saat Simpan**: VSCode memformat otomatis (jika dikonfigurasi)
- **Saat Commit**: Husky + lint-staged memformat file yang di-stage secara otomatis
- **Manual**: Jalankan `pnpm format`

### Konvensi Pesan Commit

Proyek ini menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: tambah fitur baru
fix: perbaiki bug
docs: perbarui dokumentasi
style: format kode
refactor: restrukturisasi kode
test: tambah pengujian
chore: perbarui dependensi
```

Commitlint akan **menolak** commit yang tidak mengikuti format ini.

## Pelajari Lebih Lanjut

- [Dokumentasi Next.js](https://nextjs.org/docs)
- [Dokumentasi Tailwind CSS](https://tailwindcss.com/docs)
- [Dokumentasi pnpm](https://pnpm.io)

## Deploy di Vercel

Cara termudah untuk mendeploy aplikasi Next.js Anda adalah menggunakan [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Lihat [dokumentasi deployment Next.js](https://nextjs.org/docs/app/building-your-application/deploying) untuk detail lebih lanjut.

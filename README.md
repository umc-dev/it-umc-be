## Cara Jalanin

### 1. Clone repository

```bash
git clone https://github.com/umc-dev/it-umc-be.git
cd it-umc-be
```
### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Buat file .env di root project, contoh isi:

```env
DATABASE_URL="mysql://root:password@localhost:3306/ti_umc"
PORT=9090
NODE_ENV=development
JWT_SECRET="123"
```

Note: Pastikan JWT_SECRET tidak dibagikan ke publik.

### 4. Migrate database
```bash
pnpm prisma migrate dev --name init
```

### 5. Generate Prisma Client
```bash
pnpm prisma generate
```

### 6. Jalankan development server
```bash
pnpm run dev
```

## 📁 Struktur Folder Proyek

Berikut adalah gambaran umum struktur folder dan file dalam proyek ini beserta fungsinya masing-masing.

```
.
├── src/
│   ├── config/          // Menyimpan konfigurasi (database, env variables, dll)
│   ├── controllers/     // Bertanggung jawab menerima request & mengirim response (logika HTTP)
│   ├── exceptions/      // Menyimpan custom class Error
│   ├── middlewares/     // Fungsi middleware (misal: otentikasi, logging, error handling)
│   ├── repositories/    // Jembatan ke database
│   ├── routes/          // Mendefinisikan endpoint API
│   ├── services/        // Menyimpan logika bisnis inti aplikasi
│   ├── types/           // Definisi tipe data & interface
│   ├── utils/           // Fungsi bantuan/helper
│   ├── validator/       // Skema validasi request body
│   ├── index.ts         // Titik masuk utama aplikasi (entrypoint)
│   └── server.ts        // Inisialisasi dan konfigurasi server
│
├── .env.example         // Contoh template untuk file .env (variabel lingkungan)
├── .gitignore           // Daftar file/folder yang diabaikan oleh Git
├── package.json         // Menyimpan daftar dependensi & script proyek
├── pnpm-lock.yaml       // Mengunci versi dependensi (dihasilkan oleh pnpm)
├── prisma.config.ts     // Konfigurasi spesifik untuk Prisma (jika diperlukan)
└── tsconfig.json        // Konfigurasi untuk compiler TypeScript
```

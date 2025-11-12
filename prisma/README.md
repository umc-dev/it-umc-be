README Prisma & pnpm

Ini adalah dokumentasi singkat untuk penggunaan Prisma di project ini dengan pnpm.

-----------------------------------------------------------
INSTALASI
-----------------------------------------------------------

Pastikan sudah install dependencies:

pnpm install

Prisma sudah termasuk dalam dependencies, jadi bisa langsung pakai CLI-nya.

-----------------------------------------------------------
KONEKSI DATABASE
-----------------------------------------------------------

Setiap koneksi database dikontrol lewat file .env:

DATABASE_URL="mysql://root:password@localhost:3306/ti_umc"
PORT=9090
NODE_ENV=development

Pastikan database MySQL sudah dibuat dan service MySQL berjalan (net start MySQL80).

-----------------------------------------------------------
PERINTAH PRISMA (VIA PNPM)
-----------------------------------------------------------

1. Pull schema dari database

pnpm prisma pull

- Fungsi: Ambil struktur tabel dari database yang sudah ada
- Update file schema.prisma sesuai database
- Catatan: Tidak membuat tabel baru

2. Push schema ke database

pnpm prisma push

- Fungsi: Membuat tabel di database sesuai schema.prisma
- Cocok untuk database kosong / development

3. Migrate development

pnpm prisma migrate

- Fungsi: Buat migration file dan tabel baru sesuai schema.prisma
- Bisa menambahkan nama migration:
  pnpm prisma:migrate dev --name init

4. Prisma Studio

pnpm prisma:studio

- GUI untuk melihat isi database
- Bisa CRUD data secara visual tanpa query manual

-----------------------------------------------------------
CATATAN PENTING
-----------------------------------------------------------

1. Urutan kerja normal:
   1. Buat database MySQL
   2. Update .env DATABASE_URL
   3. pnpm prisma db push atau pnpm prisma migrate dev
   4. pnpm prisma db pull jika mau sinkron dari database yang sudah ada

2. Semua perintah Prisma dijalankan lewat pnpm untuk konsistensi package manager.

3. Pastikan service MySQL berjalan setiap ingin konek ke database.

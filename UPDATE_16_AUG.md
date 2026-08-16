# API Documentation - Recent Endpoint & Schema Updates

Document ini mencakup seluruh perubahan dan penambahan API (Endpoint, Request Body, Response, serta Role Access) yang dikerjakan pada sesi ini.

---

## 1. Modul Akreditasi Kampus & Prodi (`/api/v1/accreditations`)

Modul baru khusus untuk mengelola sertifikat dan SK akreditasi kampus dan program studi.

### 🌐 Endpoints Overview

| Method | Endpoint | Access | Permission | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/accreditations` | Public | - | Mengambil daftar akreditasi (filter `category`, `prodi`, `search`) |
| `GET` | `/api/v1/accreditations/:id` | Public | - | Mengambil detail akreditasi berdasarkan ID |
| `POST` | `/api/v1/accreditations` | Protected | `accreditation:manage` | Menambahkan data akreditasi baru |
| `PUT` | `/api/v1/accreditations/:id` | Protected | `accreditation:manage` | Mengubah data akreditasi |
| `DELETE` | `/api/v1/accreditations/:id` | Protected | `accreditation:manage` | Menghapus data akreditasi |

---

### 📥 `POST /api/v1/accreditations`
*Content-Type*: `multipart/form-data`

#### Request Body:
```form-data
category: KAMPUS | PRODI         (Required)
prodi: S1 | D3                   (Optional, Wajib jika category = PRODI)
title: string                    (Required, max 255 char)
grade: string                    (Required, contoh: "Unggul", "A", "Baik Sekali")
skNumber: string                 (Required)
skLink: string                   (Optional, URL SK)
institution: string              (Optional, contoh: "BAN-PT", "LAM INFOKOM")
validFrom: string (YYYY-MM-DD)   (Required)
validUntil: string (YYYY-MM-DD)  (Required)
certificateFile: File (PDF/Image)(Optional)
```

#### Response (201 Created):
```json
{
  "statusCode": 201,
  "message": "Accreditation created",
  "data": {
    "id": "c1f7a075-812e-4b62-a5e2-2a2cf3df1d19",
    "category": "PRODI",
    "prodi": "S1",
    "title": "Akreditasi Program Studi Teknik Informatika S1",
    "grade": "Unggul",
    "skNumber": "123/SK/BAN-PT/Akred/S/VI/2024",
    "skLink": "https://example.com/sk-123.pdf",
    "certificateFile": "/uploads/1723800000-cert.pdf",
    "institution": "LAM INFOKOM",
    "validFrom": "2024-06-01T00:00:00.000Z",
    "validUntil": "2029-06-01T00:00:00.000Z",
    "createdAt": "2026-08-16T09:00:00.000Z",
    "updatedAt": "2026-08-16T09:00:00.000Z"
  }
}
```

---

## 2. Update Modul Berita (`/api/v1/news`)

Penambahan **Workflow Approval Status** (`PENDING`, `PUBLISHED`, `REJECTED`) dan pembatasan akses berbasis role (RBAC).

### 🌐 Endpoints Overview

| Method | Endpoint | Access | Permission | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/news` | Public / Auth | - | Ambil berita. Publik = hanya `PUBLISHED`. Dosen = berita milik sendiri. Admin/Editor = semua berita. |
| `GET` | `/api/v1/news/:slug` | Public / Auth | - | Ambil berita per slug |
| `POST` | `/api/v1/news` | Protected | `news:create` | Buat berita (Dosen → status `PENDING`, Admin/Editor → `PUBLISHED`) |
| `PUT` | `/api/v1/news/:slug` | Protected | `news:update` | Edit berita (Dosen hanya bisa edit beritanya sendiri) |
| `PATCH` | `/api/v1/news/:slug/approve` | Protected | `news:approve` | Approve/Reject berita Dosen (Admin & Superadmin only) |
| `DELETE` | `/api/v1/news/:slug` | Protected | `news:delete` | Hapus berita |

---

### 📥 `PATCH /api/v1/news/:slug/approve` [NEW]
*Content-Type*: `application/json`

#### Request Body:
```json
{
  "status": "PUBLISHED" // pilihan: "PUBLISHED" atau "REJECTED"
}
```

#### Response (200 OK):
```json
{
  "statusCode": 200,
  "message": "News published",
  "data": {
    "id": "f8a92b21-419b-43d9-b4cb-7d12a9e3310f",
    "title": "Pengabdian Masyarakat Dosen TI UMC",
    "slug": "pengabdian-masyarakat-dosen-ti-umc",
    "content": "<p>Isi berita...</p>",
    "thumbnail": "/uploads/1723801111-thumb.png",
    "status": "PUBLISHED",
    "authorId": "dosen-uuid",
    "categoryId": 1,
    "createdAt": "2026-08-16T08:00:00.000Z",
    "updatedAt": "2026-08-16T09:30:00.000Z"
  }
}
```

---

## 3. Update Modul Alumni (`/api/v1/alumni`)

Penambahan detail bidang pekerjaan, jabatan, sosial media, dan tahun kelulusan.

### 📥 `POST /api/v1/alumni` & `PUT /api/v1/alumni/:id`
*Content-Type*: `multipart/form-data` atau `application/json`

#### New/Updated Fields:
```form-data
name: string                     (Required)
graduationYear: number | string  (Optional, e.g. 2023)
workplace: string                (Optional, e.g. "PT Teknologi Indonesia")
position: string                 (Optional, e.g. "Senior Software Engineer")
linkedin: string                 (Optional, URL LinkedIn)
instagram: string                (Optional, Username/URL Instagram)
testimonial: string              (Optional)
photo: File (Image)              (Optional)
```

---

## 4. Update Modul Kerja Sama / Partnership (`/api/v1/partnerships`)

Pemisahan antara `photo` (logo mitra) dan `files` (array dokumen/lampiran perjanjian kerjasama).

### 📥 `POST /api/v1/partnerships` & `PUT /api/v1/partnerships/:id`
*Content-Type*: `multipart/form-data`

#### Request Body (Upload Fields):
- `photo`: File Single (Logo mitra)
- `files`: File Array (Dokumen perjanjian/MOU/MOA, max 5 files)

```form-data
name: string          (Required)
description: string   (Optional)
photo: File           (Single image - Logo Partnership)
files: File[]         (Array file - Lampiran Dokumen MOU/MOA)
```

---

## 5. Update Modul Dosen (`/api/v1/dosen`)

- **Role Scoping (`GET /api/v1/dosen`)**: Saat login menggunakan akun `DOSEN`, response array `data` secara otomatis di-filter sehingga **hanya mengembalikan profil dosen yang sedang login**.
- **Tridharma Link**: Field link kegiatan tridharma diubah ke tipe `@db.Text` untuk menampung URL yang panjang.

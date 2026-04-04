# `src/lib/`

Folder ini menyimpan **fungsi utilitas, helper, dan konfigurasi library pihak ketiga** yang digunakan di seluruh aplikasi.

## Kegunaan

- Helper functions (format tanggal, mata uang, string)
- Konfigurasi library pihak ketiga (Prisma, Supabase, NextAuth, dll.)
- Fungsi-fungsi umum yang tidak termasuk dalam komponen atau hooks
- Konstanta global aplikasi

## Struktur yang Disarankan

```
src/lib/
├── utils.js        # Helper functions umum
├── constants.js    # Konstanta global aplikasi
├── prisma.js       # Prisma client instance (jika pakai database)
└── supabase.js     # Supabase client (jika pakai Supabase)
```

## Contoh Penggunaan

**`src/lib/utils.js`**

```js
// Menggabungkan class names (berguna dengan Tailwind CSS)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Format angka ke format Rupiah
export function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
}

// Format tanggal ke format Indonesia
export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

// Memotong teks panjang
export function truncate(str, length = 100) {
  return str.length > length ? str.slice(0, length) + '...' : str;
}
```

**`src/lib/constants.js`**

```js
export const APP_NAME = 'MyApp';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
};
```

**`src/lib/prisma.js`** (contoh jika menggunakan Prisma ORM)

```js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
```

**Penggunaan:**

```js
import { formatRupiah, formatDate, cn } from '@/lib/utils';
import { USER_ROLES } from '@/lib/constants';

formatRupiah(50000); // Rp 50.000
formatDate('2024-01-15'); // 15 Januari 2024
cn('px-4', isActive && 'bg-blue-500'); // conditional classnames
```

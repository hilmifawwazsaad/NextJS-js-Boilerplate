# `src/constants/`

Folder ini menyimpan **nilai konstan dan konfigurasi** yang digunakan di berbagai bagian aplikasi. Semua data statis dikumpulkan di sini agar mudah dirawat dan diubah.

## Kegunaan

- Menghindari _hardcode_ string, angka, atau konfigurasi di komponen maupun service
- Memusatkan pengaturan seperti base URL API, role pengguna, path rute, dan label status
- Memudahkan perubahan nilai di satu tempat tanpa menyusuri seluruh kode
- Membantu menjaga konsistensi penamaan dan nilai di seluruh proyek

## Struktur yang Disarankan

```
src/constants/
├── api.js           # Endpoint, base URL, timeout
├── routes.js        # Path halaman (routes) aplikasi
├── roles.js         # Enum role pengguna (admin, user, dll.)
├── config.js        # Konfigurasi umum (judul, mode debug, lisensi)
└── messages.js      # Teks baku atau pesan notifikasi
```

## Contoh Penggunaan

**`src/constants/api.js`**

```js
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
export const API_TIMEOUT = 10000; // dalam milidetik

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  PROFILE: '/user/profile',
  PRODUCTS: '/products',
};
```

**`src/constants/roles.js`**

```js
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.USER]: 'Pengguna',
  [ROLES.GUEST]: 'Tamu',
};
```

**`src/constants/routes.js`**

```js
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
};
```

**Penggunaan di komponen atau service**

```jsx
import { API_BASE_URL, ENDPOINTS } from '@/constants/api';
import { ROLES } from '@/constants/roles';
import { ROUTES } from '@/constants/routes';

// Contoh service login
function login(email, password) {
  return fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

// Contoh komponen dengan role‑based rendering
export default function Dashboard() {
  const user = { role: ROLES.ADMIN };

  return (
    <div>
      {user.role === ROLES.ADMIN && <AdminPanel />}
      <a href={ROUTES.PROFILE}>Profil</a>
    </div>
  );
}
```

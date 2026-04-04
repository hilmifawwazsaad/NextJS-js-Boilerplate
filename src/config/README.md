# `src/config/`

Folder ini menyimpan **konfigurasi aplikasi** yang bersifat statis dan terpusat — berbeda dari `lib/` yang berisi fungsi utilitas.

## Kegunaan

- Konfigurasi navigasi (menu, sidebar, breadcrumb)
- Metadata situs (nama app, deskripsi, social links)
- Konfigurasi fitur (feature flags, role permissions)
- Pengaturan yang mungkin berubah antar environment atau dikustomisasi

## Struktur yang Disarankan

```
src/config/
├── site.js         # Metadata situs (nama, deskripsi, URL)
├── navigation.js   # Konfigurasi menu navigasi
└── permissions.js  # Konfigurasi role dan akses fitur
```

## Contoh Penggunaan

**`src/config/site.js`**

```js
export const siteConfig = {
  name: 'MyApp',
  description: 'Deskripsi singkat aplikasi.',
  url: process.env.NEXT_PUBLIC_APP_URL,
  links: {
    github: 'https://github.com/username/repo',
    instagram: 'https://instagram.com/username',
  },
};
```

**`src/config/navigation.js`**

```js
export const mainNav = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/about' },
  { label: 'Kontak', href: '/contact' },
];

export const dashboardNav = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Pengguna', href: '/dashboard/users', icon: 'Users' },
  { label: 'Pengaturan', href: '/dashboard/settings', icon: 'Settings' },
];
```

**`src/config/permissions.js`**

```js
export const rolePermissions = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  user: ['read', 'write'],
  guest: ['read'],
};

export function hasPermission(role, action) {
  return rolePermissions[role]?.includes(action) ?? false;
}
```

**Penggunaan di komponen:**

```jsx
import { siteConfig } from '@/config/site';
import { mainNav } from '@/config/navigation';

export default function Navbar() {
  return (
    <nav>
      <span>{siteConfig.name}</span>
      <ul>
        {mainNav.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

**Penggunaan di `app/layout.jsx` untuk metadata:**

```jsx
import { siteConfig } from '@/config/site';

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};
```

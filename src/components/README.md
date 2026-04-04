# `src/components/`

Folder ini menyimpan **komponen React yang dapat digunakan ulang (reusable)** di seluruh aplikasi.

## Kegunaan

- Komponen UI yang bersifat umum (Button, Input, Modal, Card, Badge)
- Komponen layout (Navbar, Sidebar, Footer)
- Komponen yang tidak terikat pada satu halaman tertentu

## Struktur yang Disarankan

```
src/components/
├── ui/             # Komponen UI dasar (Button, Input, Badge, dll.)
├── layout/         # Komponen layout (Navbar, Sidebar, Footer)
├── forms/          # Komponen form yang reusable
└── shared/         # Komponen yang dipakai lintas fitur
```

## Contoh Penggunaan

**`src/components/ui/Button.jsx`**

```jsx
export default function Button({ children, variant = 'primary', ...props }) {
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

**`src/components/layout/Navbar.jsx`**

```jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between px-6 py-4 border-b'>
      <Link href='/' className='font-bold text-xl'>
        MyApp
      </Link>
      <div className='flex gap-4'>
        <Link href='/about'>About</Link>
        <Link href='/login'>Login</Link>
      </div>
    </nav>
  );
}
```

**Penggunaan di halaman:**

```jsx
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Button variant='primary'>Mulai Sekarang</Button>
        <Button variant='outline'>Pelajari Lebih Lanjut</Button>
      </main>
    </>
  );
}
```

# `src/utils/`

Folder ini menyimpan **fungsi-fungsi utilitas murni (pure functions)** yang bersifat umum dan tidak bergantung pada library pihak ketiga maupun state aplikasi.

## Kegunaan

- Transformasi dan manipulasi data (array, objek, string, angka)
- Fungsi helper yang bisa dipakai di mana saja tanpa efek samping
- Berbeda dengan `src/lib/` yang berisi konfigurasi library dan koneksi eksternal, `utils/` hanya berisi logika JavaScript murni

## Struktur yang Disarankan

```
src/utils/
├── string.js       # Manipulasi string (capitalize, slug, truncate)
├── array.js        # Manipulasi array (groupBy, sortBy, unique)
├── number.js       # Format angka (rupiah, persentase, pembulatan)
├── date.js         # Format dan kalkulasi tanggal
└── object.js       # Manipulasi objek (omit, pick, deepMerge)
```

## Contoh Penggunaan

**`src/utils/string.js`**

```js
// Kapitalisasi huruf pertama setiap kata
export function capitalize(str) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Mengubah teks menjadi URL slug
export function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

// Memotong teks panjang
export function truncate(str, length = 100) {
  return str.length > length ? str.slice(0, length) + '...' : str;
}
```

**`src/utils/array.js`**

```js
// Menghapus duplikat dari array
export function unique(arr) {
  return [...new Set(arr)];
}

// Mengelompokkan array of objects berdasarkan key
export function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
}
```

**`src/utils/number.js`**

```js
// Format angka ke Rupiah
export function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}

// Membulatkan angka ke N desimal
export function round(number, decimals = 2) {
  return Math.round(number * 10 ** decimals) / 10 ** decimals;
}
```

**Penggunaan di komponen atau halaman:**

```js
import { capitalize, toSlug } from '@/utils/string';
import { groupBy } from '@/utils/array';
import { formatRupiah } from '@/utils/number';

capitalize('hello world'); // Hello World
toSlug('Berita Terbaru'); // berita-terbaru
formatRupiah(75000); // Rp 75.000

const grouped = groupBy(members, 'divisi');
// { 'IT': [...], 'Humas': [...] }
```

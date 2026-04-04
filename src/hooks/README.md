# `src/hooks/`

Folder ini menyimpan **custom React hooks** yang mengenkapsulasi logika stateful agar dapat digunakan ulang di berbagai komponen.

## Kegunaan

- Memisahkan logika dari komponen agar lebih bersih dan mudah di-test
- Mengabstraksikan operasi yang berulang (fetch data, localStorage, event listener)
- Naming convention: **wajib diawali dengan `use`** (contoh: `useAuth`, `useFetch`)

## Contoh Penggunaan

**`src/hooks/useLocalStorage.js`**

```js
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
```

**`src/hooks/useFetch.js`**

```js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

**`src/hooks/useDebounce.js`**

```js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

**Penggunaan di komponen:**

```jsx
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchUsers() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const { data, loading } = useFetch(`/api/users?q=${debouncedQuery}`);

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      {data?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

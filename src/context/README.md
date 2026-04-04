# `src/context/`

Folder ini menyimpan **React Context** untuk state global yang perlu diakses oleh banyak komponen tanpa prop drilling.

## Kegunaan

- State yang dibutuhkan di banyak tempat sekaligus (auth, tema, bahasa, dll.)
- Alternatif ringan dari state management library seperti Zustand atau Redux
- Setiap context biasanya terdiri dari: Context, Provider, dan custom hook

## Struktur yang Disarankan

```
src/context/
├── AuthContext.jsx      # State autentikasi (user login, role, token)
├── ThemeContext.jsx     # State tema (light/dark mode)
└── LanguageContext.jsx  # State bahasa (i18n)
```

## Contoh Penggunaan

**`src/context/AuthContext.jsx`**

```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook agar mudah dipakai di komponen
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider');
  return context;
}
```

**Daftarkan Provider di `app/layout.jsx`:**

```jsx
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang='id'>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

**Penggunaan di komponen manapun:**

```jsx
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <span>Halo, {user?.name}</span>
      <button onClick={logout}>Keluar</button>
    </nav>
  );
}
```

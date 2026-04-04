# `src/validations/`

Folder ini menyimpan **schema validasi** untuk form dan data input, biasanya menggunakan library seperti [Zod](https://zod.dev/) atau [Yup](https://github.com/jquense/yup).

## Kegunaan

- Mendefinisikan aturan validasi terpusat (login, register, produk, dll.)
- Memisahkan logika validasi dari komponen form agar lebih bersih
- Schema yang sama bisa dipakai di sisi klien (form) maupun server (API Route)

## Struktur yang Disarankan

```
src/validations/
├── authSchema.js      # Validasi login dan register
├── profileSchema.js   # Validasi update profil
└── productSchema.js   # Validasi form produk
```

## Contoh Penggunaan dengan Zod

**`src/validations/authSchema.js`**

```js
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  });
```

**Penggunaan di form dengan React Hook Form:**

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validations/authSchema';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    // data sudah tervalidasi
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='email' {...register('email')} />
      {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

      <input type='password' {...register('password')} />
      {errors.password && (
        <p className='text-red-500'>{errors.password.message}</p>
      )}

      <button type='submit'>Login</button>
    </form>
  );
}
```

**Penggunaan di API Route Handler (server-side):**

```js
// app/api/auth/login/route.js
import { loginSchema } from '@/validations/authSchema';

export async function POST(request) {
  const body = await request.json();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // lanjutkan proses login dengan data yang sudah valid
  const { email, password } = result.data;
  // ...
}
```

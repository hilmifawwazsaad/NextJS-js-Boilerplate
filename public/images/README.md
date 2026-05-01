# Images

Static image assets for the application.

## Usage with Next.js

Use the built-in `<Image>` component from `next/image` instead of `<img>` for automatic optimization (resize, compress, convert to WebP/AVIF).

```jsx
import Image from 'next/image'

<Image
  src="/images/filename.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

## Recommended Formats

| Format | Use Case |
|---|---|
| `.jpg` / `.jpeg` | Photos, complex images with many colors |
| `.png` | Images with transparency |
| `.svg` | Icons, logos, illustrations |
| `.webp` | Modern alternative to JPG/PNG (smaller file size) |

> Next.js will automatically serve WebP/AVIF to supported browsers regardless of the source format.

## Optimal Guidelines

- **Max file size**: < 500 KB per image before optimization
- **Resolution**: match the largest display size needed (e.g., 1920px for hero images)
- **Aspect ratio**: keep consistent per usage context (e.g., 16:9 for banners, 1:1 for avatars)
- **Avoid**: storing images > 2 MB here — use a CDN or cloud storage (Cloudinary, S3) instead

## What to Store Here

- Static illustrations or decorative assets

> Favicon and logo files are typically placed directly in `public/` (e.g., `public/favicon.ico`, `public/logo.svg`), not in this folder.

Avoid storing user-uploaded images here — handle those via a backend or cloud storage.

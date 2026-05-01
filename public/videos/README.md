# Videos

Static video assets for the application.

## Usage

Next.js does not have a built-in video component. Use the native `<video>` HTML element.

```jsx
<video autoPlay muted loop playsInline>
  <source src="/videos/filename.mp4" type="video/mp4" />
  <source src="/videos/filename.webm" type="video/webm" />
</video>
```

> Provide both `.mp4` and `.webm` for broader browser compatibility. The browser will use the first supported format.

## Recommended Formats

| Format | Codec | Use Case |
|---|---|---|
| `.mp4` | H.264 | Widest browser support, good for most use cases |
| `.webm` | VP9 | Smaller file size, modern browsers |

## Optimal Guidelines

- **Max file size**: < 10 MB for background/decorative videos, < 50 MB for content videos
- **Resolution**: 1080p (1920×1080) max for web; use 720p for background loops
- **Frame rate**: 24–30 fps is sufficient for web
- **Duration**: keep background/loop videos under 10 seconds
- **Always use**: `muted` + `playsInline` for autoplay to work on mobile browsers

## Compression Tips

- Use [HandBrake](https://handbrake.fr) or `ffmpeg` to compress before adding here
- Example with ffmpeg:
  ```bash
  # Convert and compress to MP4
  ffmpeg -i input.mov -vcodec h264 -acodec aac -crf 28 output.mp4

  # Convert to WebM
  ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
  ```

## What to Store Here

- Background loop videos
- Short decorative/hero videos

Avoid storing long or large videos here — use YouTube, Vimeo, or cloud storage (S3, Cloudinary) instead and embed via URL.

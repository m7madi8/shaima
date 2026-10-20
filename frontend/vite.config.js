import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function siteOrigin() {
  const explicit = process.env.VITE_SITE_URL || process.env.SITE_URL || ''
  if (explicit) return explicit.replace(/\/$/, '')

  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || ''
  if (!host) return ''

  return `https://${host.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
}

function absoluteShareMeta() {
  const origin = siteOrigin()

  return {
    name: 'absolute-share-meta',
    transformIndexHtml(html) {
      if (!origin) return html

      return html
        .replaceAll('content="/og-image', `content="${origin}/og-image`)
        .replace(
          /(<meta\b[^>]*property="og:url"[^>]*content=")\/(")/,
          `$1${origin}/$2`,
        )
        .replace(
          /(<link\b[^>]*rel="canonical"[^>]*href=")\/(")/,
          `$1${origin}/$2`,
        )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : './',
  plugins: [
    absoluteShareMeta(),
    tailwindcss(),
    react()
  ],
  optimizeDeps: {
    include: ["gsap", "lenis"],
  },
});
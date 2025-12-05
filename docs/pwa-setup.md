# PWA Setup Guide

This document describes how to configure a Vite + React project as a Progressive Web App (PWA) using `vite-plugin-pwa`.

## Prerequisites

- Vite project with React
- App icons in the `public` directory

## Step 1: Install vite-plugin-pwa

```bash
pnpm add -D vite-plugin-pwa
```

**Reference:** [vite-plugin-pwa Installation Guide](https://vite-pwa-org.netlify.app/guide/#installing-vite-plugin-pwa)

## Step 2: Configure vite.config.ts

Add the `VitePWA` plugin to your Vite configuration:

```typescript
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["forest-green.png"],
      manifest: {
        name: "Neon Gemini Runner",
        short_name: "Gemini Runner",
        description: "Neon Gemini Runner Game",
        theme_color: "#050011",
        background_color: "#050011",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/forest-green.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
```

### Configuration Details

| Option | Description | Reference |
|--------|-------------|-----------|
| `registerType` | How the service worker is registered. `autoUpdate` automatically updates the SW when new content is available. | [Register Type](https://vite-pwa-org.netlify.app/guide/register-service-worker.html) |
| `includeAssets` | Additional assets to be included in the precache manifest. | [Static Assets](https://vite-pwa-org.netlify.app/guide/static-assets.html) |
| `manifest` | Web App Manifest configuration. | [PWA Manifest](https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html) |
| `workbox` | Workbox configuration for service worker. | [Workbox](https://vite-pwa-org.netlify.app/workbox/) |

### Manifest Properties

| Property | Description | Reference |
|----------|-------------|-----------|
| `name` | Full name of the application | [MDN: name](https://developer.mozilla.org/en-US/docs/Web/Manifest/name) |
| `short_name` | Short name for app launcher | [MDN: short_name](https://developer.mozilla.org/en-US/docs/Web/Manifest/short_name) |
| `theme_color` | Default theme color for the application | [MDN: theme_color](https://developer.mozilla.org/en-US/docs/Web/Manifest/theme_color) |
| `background_color` | Background color for splash screen | [MDN: background_color](https://developer.mozilla.org/en-US/docs/Web/Manifest/background_color) |
| `display` | Display mode (`standalone`, `fullscreen`, etc.) | [MDN: display](https://developer.mozilla.org/en-US/docs/Web/Manifest/display) |
| `orientation` | Default orientation (`portrait`, `landscape`) | [MDN: orientation](https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation) |
| `icons` | Array of icon objects for different sizes | [MDN: icons](https://developer.mozilla.org/en-US/docs/Web/Manifest/icons) |

### Workbox Runtime Caching

The `runtimeCaching` option allows caching of external resources at runtime.

**Reference:** [Workbox Runtime Caching](https://developer.chrome.com/docs/workbox/modules/workbox-build#runtimecaching)

## Step 3: Update index.html

Add PWA-related meta tags to `index.html`:

```html
<head>
  <!-- Basic PWA meta tags -->
  <meta name="description" content="Neon Gemini Runner Game" />
  <meta name="theme-color" content="#050011" />

  <!-- Icons -->
  <link rel="icon" href="/forest-green.png" />
  <link rel="apple-touch-icon" href="/forest-green.png" />

  <!-- iOS specific -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Gemini Runner" />
</head>
```

### Meta Tag References

| Meta Tag | Description | Reference |
|----------|-------------|-----------|
| `theme-color` | Sets the browser toolbar color | [MDN: theme-color](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color) |
| `apple-touch-icon` | Icon for iOS home screen | [Apple: Configuring Web Applications](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) |
| `apple-mobile-web-app-capable` | Enables full-screen mode on iOS | [Apple: apple-mobile-web-app-capable](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html) |
| `apple-mobile-web-app-status-bar-style` | iOS status bar appearance | [Apple: apple-mobile-web-app-status-bar-style](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html) |

## Step 4: Build and Verify

Build the project and verify PWA files are generated:

```bash
pnpm build
```

Expected output files in `dist/`:
- `manifest.webmanifest` - Web App Manifest
- `sw.js` - Service Worker
- `registerSW.js` - Service Worker registration script
- `workbox-*.js` - Workbox runtime

## Step 5: Test PWA

1. Run preview server:
   ```bash
   pnpm preview
   ```

2. Open Chrome DevTools > Application tab
3. Check "Manifest" section for manifest details
4. Check "Service Workers" section for SW status
5. Use Lighthouse to audit PWA compliance

**Reference:** [Chrome DevTools: Debug PWAs](https://developer.chrome.com/docs/devtools/progressive-web-apps)

## Additional Resources

- [vite-plugin-pwa Documentation](https://vite-pwa-org.netlify.app/)
- [Web App Manifest - MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox Documentation](https://developer.chrome.com/docs/workbox)
- [PWA Builder](https://www.pwabuilder.com/)

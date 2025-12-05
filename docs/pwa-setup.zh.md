# PWA 配置指南

本文档描述如何使用 `vite-plugin-pwa` 将 Vite + React 项目配置为渐进式 Web 应用 (PWA)。

## 前置条件

- Vite + React 项目
- 应用图标位于 `public` 目录

## 步骤 1: 安装 vite-plugin-pwa

```bash
pnpm add -D vite-plugin-pwa
```

**参考文档:** [vite-plugin-pwa 安装指南](https://vite-pwa-org.netlify.app/guide/#installing-vite-plugin-pwa)

## 步骤 2: 配置 vite.config.ts

在 Vite 配置中添加 `VitePWA` 插件：

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

### 配置项说明

| 选项            | 说明                                                                | 参考文档                                                                             |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `registerType`  | Service Worker 注册方式。`autoUpdate` 表示当有新内容时自动更新 SW。 | [注册类型](https://vite-pwa-org.netlify.app/guide/register-service-worker.html)      |
| `includeAssets` | 需要包含在预缓存清单中的额外资源。                                  | [静态资源](https://vite-pwa-org.netlify.app/guide/static-assets.html)                |
| `manifest`      | Web App Manifest 配置。                                             | [PWA Manifest](https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html) |
| `workbox`       | Workbox 配置，用于 Service Worker。                                 | [Workbox](https://vite-pwa-org.netlify.app/workbox/)                                 |

### Manifest 属性说明

| 属性               | 说明                                          | 参考文档                                                                                        |
| ------------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `name`             | 应用的完整名称                                | [MDN: name](https://developer.mozilla.org/zh-CN/docs/Web/Manifest/name)                         |
| `short_name`       | 应用启动器显示的短名称                        | [MDN: short_name](https://developer.mozilla.org/zh-CN/docs/Web/Manifest/short_name)             |
| `theme_color`      | 应用的默认主题颜色                            | [MDN: theme_color](https://developer.mozilla.org/zh-CN/docs/Web/Manifest/theme_color)           |
| `background_color` | 启动画面的背景颜色                            | [MDN: background_color](https://developer.mozilla.org/zh-CN/docs/Web/Manifest/background_color) |
| `display`          | 显示模式（`standalone`、`fullscreen` 等）     | [MDN: display](https://developer.mozilla.org/zh-CN/docs/Web/Manifest/display)                   |
| `orientation`      | 默认方向（`portrait` 竖屏、`landscape` 横屏） | [MDN: orientation](https://developer.mozilla.org/zh-CN/docs/Web/Manifest/orientation)           |
| `icons`            | 不同尺寸的图标数组                            | [MDN: icons](https://developer.mozilla.org/zh-CN/docs/Web/Manifest/icons)                       |

### Workbox 运行时缓存

`runtimeCaching` 选项允许在运行时缓存外部资源。

**参考文档:** [Workbox 运行时缓存](https://developer.chrome.com/docs/workbox/modules/workbox-build#runtimecaching)

## 步骤 3: 更新 index.html

在 `index.html` 中添加 PWA 相关的 meta 标签：

```html
<head>
  <!-- 基本 PWA meta 标签 -->
  <meta name="description" content="Neon Gemini Runner Game" />
  <meta name="theme-color" content="#050011" />

  <!-- 图标 -->
  <link rel="icon" href="/forest-green.png" />
  <link rel="apple-touch-icon" href="/forest-green.png" />

  <!-- iOS 特定配置 -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  />
  <meta name="apple-mobile-web-app-title" content="Gemini Runner" />
</head>
```

### Meta 标签参考

| Meta 标签                               | 说明                  | 参考文档                                                                                                                                                                                  |
| --------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-color`                           | 设置浏览器工具栏颜色  | [MDN: theme-color](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name/theme-color)                                                                                       |
| `apple-touch-icon`                      | iOS 主屏幕图标        | [Apple: 配置 Web 应用](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) |
| `apple-mobile-web-app-capable`          | 在 iOS 上启用全屏模式 | [Apple: apple-mobile-web-app-capable](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)                         |
| `apple-mobile-web-app-status-bar-style` | iOS 状态栏外观        | [Apple: apple-mobile-web-app-status-bar-style](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)                |

## 步骤 4: 构建并验证

构建项目并验证 PWA 文件是否生成：

```bash
pnpm build
```

`dist/` 目录中预期生成的文件：

- `manifest.webmanifest` - Web App Manifest 文件
- `sw.js` - Service Worker
- `registerSW.js` - Service Worker 注册脚本
- `workbox-*.js` - Workbox 运行时

## 步骤 5: 测试 PWA

1. 运行预览服务器：

   ```bash
   pnpm preview
   ```

2. 打开 Chrome 开发者工具 > Application 标签页
3. 检查 "Manifest" 部分查看清单详情
4. 检查 "Service Workers" 部分查看 SW 状态
5. 使用 Lighthouse 审计 PWA 合规性

**参考文档:** [Chrome DevTools: 调试 PWA](https://developer.chrome.com/docs/devtools/progressive-web-apps)

## 其他资源

- [vite-plugin-pwa 官方文档](https://vite-pwa-org.netlify.app/)
- [Web App Manifest - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)
- [Service Workers - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
- [Workbox 官方文档](https://developer.chrome.com/docs/workbox)
- [PWA Builder](https://www.pwabuilder.com/)

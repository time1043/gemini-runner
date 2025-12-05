# Capacitor 配置指南

本文档描述如何使用 Capacitor 将 Vite + React 项目配置为原生 Android 应用。

## 前置条件

- Vite + React 项目
- 已安装 Node.js 和 pnpm
- 已安装 [Android Studio](https://developer.android.com/studio)

**参考文档:** [Capacitor 环境配置](https://capacitorjs.com/docs/getting-started/environment-setup)

## 步骤 1: 安装 Capacitor Core 和 CLI

```bash
pnpm add -D @capacitor/core @capacitor/cli
```

**参考文档:** [Capacitor 安装](https://capacitorjs.com/docs/getting-started#install-capacitor)

## 步骤 2: 初始化 Capacitor

```bash
pnpm cap init
```

系统会提示你输入：

- **App Name**: 应用名称（如 `gemini-runner`）
- **Package ID**: 反向域名格式的唯一标识符（如 `com.example.app`）

这将创建 `capacitor.config.ts`：

```typescript
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "gemini-runner",
  webDir: "dist",
};

export default config;
```

### 配置项说明

| 选项      | 说明                                                            | 参考文档                                                |
| --------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| `appId`   | 应用的唯一标识符（iOS 的 Bundle ID，Android 的 Application ID） | [Capacitor Config](https://capacitorjs.com/docs/config) |
| `appName` | 设备上显示的应用名称                                            | [Capacitor Config](https://capacitorjs.com/docs/config) |
| `webDir`  | 包含构建后 Web 资源的目录                                       | [Capacitor Config](https://capacitorjs.com/docs/config) |

**参考文档:** [Capacitor 配置](https://capacitorjs.com/docs/config)

## 步骤 3: 构建 Web 资源

构建 Vite 项目以生成 `dist` 目录：

```bash
pnpm build
```

**参考文档:** [Vite 构建](https://vite.dev/guide/build.html)

## 步骤 4: 同步 Web 资源

将 Web 资源同步到原生项目：

```bash
pnpm cap sync
```

此命令会复制 Web 资源并更新原生插件。

**参考文档:** [Capacitor Sync](https://capacitorjs.com/docs/cli/commands/sync)

## 步骤 5: 添加 Android 平台

安装 Android 平台包：

```bash
pnpm add @capacitor/android
```

添加 Android 原生项目：

```bash
pnpm cap add android
```

这将创建包含原生 Android 项目的 `android/` 目录。

**参考文档:** [Capacitor Android](https://capacitorjs.com/docs/android)

## 步骤 6: 在 Android Studio 中打开

在 Android Studio 中打开项目：

```bash
pnpm cap open android
```

**参考文档:** [打开原生项目](https://capacitorjs.com/docs/basics/workflow#open-your-native-ide)

## 步骤 7: 在 Android Studio 中构建 APK

按照以下步骤构建 APK：

1. **等待 Gradle 同步** - Android Studio 打开项目时会自动同步 Gradle，请等待完成。

2. **构建项目**

   - 菜单: `Build` > `Make Project`（或按 `Ctrl+F9` / `Cmd+F9`）

3. **构建 Debug APK**

   - 菜单: `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
   - 等待构建完成
   - 点击通知中的 "locate" 定位 APK 文件

4. **APK 位置**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### 构建 Release APK（签名版）

用于生产发布：

1. **生成签名密钥**

   - 菜单: `Build` > `Generate Signed Bundle / APK`
   - 选择 `APK`
   - 创建新的 keystore 或使用现有的

2. **构建 Release APK**
   - 选择 release 构建变体
   - APK 位置: `android/app/build/outputs/apk/release/app-release.apk`

**参考文档:** [Android 构建与部署](https://capacitorjs.com/docs/android#building-your-app)

## 开发工作流

修改 Web 代码后：

```bash
# 1. 重新构建 Web 资源
pnpm build

# 2. 同步到原生项目
pnpm cap sync

# 3. 在 Android Studio 中打开（如果尚未打开）
pnpm cap open android

# 4. 在 Android Studio 中运行或构建
```

**参考文档:** [开发者工作流](https://capacitorjs.com/docs/basics/workflow)

## 常用命令

| 命令                    | 说明                         | 参考文档                                                   |
| ----------------------- | ---------------------------- | ---------------------------------------------------------- |
| `pnpm cap sync`         | 复制 Web 资源并更新插件      | [sync](https://capacitorjs.com/docs/cli/commands/sync)     |
| `pnpm cap copy`         | 仅复制 Web 资源              | [copy](https://capacitorjs.com/docs/cli/commands/copy)     |
| `pnpm cap update`       | 仅更新原生插件               | [update](https://capacitorjs.com/docs/cli/commands/update) |
| `pnpm cap open android` | 在 Android Studio 中打开项目 | [open](https://capacitorjs.com/docs/cli/commands/open)     |
| `pnpm cap run android`  | 在连接的设备/模拟器上运行    | [run](https://capacitorjs.com/docs/cli/commands/run)       |

## 项目结构

```
gemini-runner/
├── android/                    # 原生 Android 项目
│   ├── app/
│   │   ├── build/
│   │   │   └── outputs/
│   │   │       └── apk/
│   │   │           └── debug/
│   │   │               └── app-debug.apk
│   │   └── src/
│   │       └── main/
│   │           └── assets/
│   │               └── public/  # Web 资源复制到此处
│   └── ...
├── dist/                       # Vite 构建输出
├── capacitor.config.ts         # Capacitor 配置
└── package.json
```

## 其他资源

- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [Capacitor Android 文档](https://capacitorjs.com/docs/android)
- [Android Studio 用户指南](https://developer.android.com/studio/intro)
- [Capacitor CLI 参考](https://capacitorjs.com/docs/cli)

```shell
➜  gemini-runner git:(capacitor) pnpm add -D @capacitor/core @capacitor/cli
Packages: +64 -279
++++++++++++++++++++++++++++++++++-------------------------------------------------------------------------------------------------------------------------------------------------------
Progress: resolved 270, reused 224, downloaded 0, added 62, done

devDependencies:
+ @capacitor/cli 7.4.4
+ @capacitor/core 7.4.4
- vite-plugin-pwa 1.2.0

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: esbuild.                                                          │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 5.1s using pnpm v10.18.0
➜  gemini-runner git:(capacitor) ✗ pnpm cap init
[?] What is the name of your app?
    This should be a human-friendly app name, like what you'd see in the App Store.
✔ Name … gemini-runner
[?] What should be the Package ID for your app?
    Package IDs (aka Bundle ID in iOS and Application ID in Android) are unique identifiers for apps. They must be in
    reverse domain name notation, generally representing a domain name that you or your company owns.
✔ Package ID … com.example.app
✔ Creating capacitor.config.ts in /Users/oswin902/Documents/code3/base/project/gemini-runner in 2.57ms
[success] capacitor.config.ts created!

Next steps:
https://capacitorjs.com/docs/getting-started#where-to-go-next
[?] Join the Ionic Community! 💙
    Connect with millions of developers on the Ionic Forum and get access to live events, news updates, and more.
✔ Create free Ionic account? … no

Thank you for helping improve Capacitor by sharing anonymous usage data! 💖
Information about the data we collect is available on our website: https://capacitorjs.com/docs/next/cli/telemetry
You can disable telemetry at any time by using the npx cap telemetry off command.%
➜  gemini-runner git:(capacitor) ✗ pnpm build

> gemini-runner@0.0.0 build /Users/oswin902/Documents/code3/base/project/gemini-runner
> vite build

vite v6.4.1 building for production...
✓ 2305 modules transformed.
dist/index.html                    1.96 kB │ gzip:   0.77 kB
dist/assets/index-DUyiX2Mo.js  1,195.33 kB │ gzip: 334.35 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 2.35s
➜  gemini-runner git:(capacitor) ✗ pnpm cap sync
✔ copy web in 2.11ms
✔ update web in 1.43ms
[info] Sync finished in 0.01s
➜  gemini-runner git:(capacitor) ✗ pnpm add @capacitor/android
Packages: +1
+
Progress: resolved 271, reused 224, downloaded 1, added 1, done

dependencies:
+ @capacitor/android 7.4.4

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: esbuild.                                                          │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 2.4s using pnpm v10.18.0
➜  gemini-runner git:(capacitor) ✗ pnpm cap add android
✔ Adding native android project in android in 13.21ms
✔ add in 13.36ms
✔ Copying web assets from dist to android/app/src/main/assets/public in 2.09ms
✔ Creating capacitor.config.json in android/app/src/main/assets in 168.79μs
✔ copy android in 5.97ms
✔ Updating Android plugins in 731.75μs
✔ update android in 6.93ms
✔ Syncing Gradle in 1.65s
[success] android platform added!
Follow the Developer Workflow guide to get building:
https://capacitorjs.com/docs/basics/workflow
➜  gemini-runner git:(capacitor) ✗ pnpm cap open android
[info] Opening Android project at: android.
➜  gemini-runner git:(capacitor) ✗ cd android/app/build/outputs/apk/debug
➜  debug git:(capacitor) ✗ ls
app-debug.apk        output-metadata.json
```

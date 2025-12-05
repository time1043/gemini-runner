# Capacitor Setup Guide

This document describes how to configure a Vite + React project as a native Android application using Capacitor.

## Prerequisites

- Vite project with React
- Node.js and pnpm installed
- [Android Studio](https://developer.android.com/studio) installed

**Reference:** [Capacitor Environment Setup](https://capacitorjs.com/docs/getting-started/environment-setup)

## Step 1: Install Capacitor Core and CLI

```bash
pnpm add -D @capacitor/core @capacitor/cli
```

**Reference:** [Capacitor Installation](https://capacitorjs.com/docs/getting-started#install-capacitor)

## Step 2: Initialize Capacitor

```bash
pnpm cap init
```

You will be prompted to enter:

- **App Name**: Human-friendly app name (e.g., `gemini-runner`)
- **Package ID**: Unique identifier in reverse domain notation (e.g., `com.example.app`)

This creates `capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "gemini-runner",
  webDir: "dist",
};

export default config;
```

### Configuration Options

| Option    | Description                                                                   | Reference                                               |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------------------------- |
| `appId`   | Unique identifier for the app (Bundle ID for iOS, Application ID for Android) | [Capacitor Config](https://capacitorjs.com/docs/config) |
| `appName` | Human-readable name displayed on the device                                   | [Capacitor Config](https://capacitorjs.com/docs/config) |
| `webDir`  | Directory containing the built web assets                                     | [Capacitor Config](https://capacitorjs.com/docs/config) |

**Reference:** [Capacitor Configuration](https://capacitorjs.com/docs/config)

## Step 3: Build Web Assets

Build the Vite project to generate the `dist` directory:

```bash
pnpm build
```

**Reference:** [Vite Build](https://vite.dev/guide/build.html)

## Step 4: Sync Web Assets

Sync the web assets with the native project:

```bash
pnpm cap sync
```

This command copies web assets and updates native plugins.

**Reference:** [Capacitor Sync](https://capacitorjs.com/docs/cli/commands/sync)

## Step 5: Add Android Platform

Install the Android platform package:

```bash
pnpm add @capacitor/android
```

Add the Android native project:

```bash
pnpm cap add android
```

This creates the `android/` directory containing the native Android project.

**Reference:** [Capacitor Android](https://capacitorjs.com/docs/android)

## Step 6: Open in Android Studio

Open the project in Android Studio:

```bash
pnpm cap open android
```

**Reference:** [Opening Native Projects](https://capacitorjs.com/docs/basics/workflow#open-your-native-ide)

## Step 7: Build APK in Android Studio

Follow these steps to build the APK:

1. **Wait for Gradle sync** - Android Studio will automatically sync Gradle when the project opens. Wait for it to complete.

2. **Build the project**

   - Menu: `Build` > `Make Project` (or press `Ctrl+F9` / `Cmd+F9`)

3. **Build Debug APK**

   - Menu: `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
   - Wait for the build to complete
   - Click "locate" in the notification to find the APK

4. **APK Location**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Build Release APK (Signed)

For production release:

1. **Generate signing key**

   - Menu: `Build` > `Generate Signed Bundle / APK`
   - Select `APK`
   - Create new keystore or use existing one

2. **Build Release APK**
   - Select release build variant
   - APK location: `android/app/build/outputs/apk/release/app-release.apk`

**Reference:** [Android Build & Deploy](https://capacitorjs.com/docs/android#building-your-app)

## Development Workflow

After making changes to your web code:

```bash
# 1. Rebuild web assets
pnpm build

# 2. Sync with native project
pnpm cap sync

# 3. Open in Android Studio (if not already open)
pnpm cap open android

# 4. Run or build in Android Studio
```

**Reference:** [Developer Workflow](https://capacitorjs.com/docs/basics/workflow)

## Useful Commands

| Command                 | Description                            | Reference                                                  |
| ----------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `pnpm cap sync`         | Copy web assets and update plugins     | [sync](https://capacitorjs.com/docs/cli/commands/sync)     |
| `pnpm cap copy`         | Copy web assets only                   | [copy](https://capacitorjs.com/docs/cli/commands/copy)     |
| `pnpm cap update`       | Update native plugins only             | [update](https://capacitorjs.com/docs/cli/commands/update) |
| `pnpm cap open android` | Open Android project in Android Studio | [open](https://capacitorjs.com/docs/cli/commands/open)     |
| `pnpm cap run android`  | Run on connected device/emulator       | [run](https://capacitorjs.com/docs/cli/commands/run)       |

## Project Structure

```
gemini-runner/
├── android/                    # Native Android project
│   ├── app/
│   │   ├── build/
│   │   │   └── outputs/
│   │   │       └── apk/
│   │   │           └── debug/
│   │   │               └── app-debug.apk
│   │   └── src/
│   │       └── main/
│   │           └── assets/
│   │               └── public/  # Web assets copied here
│   └── ...
├── dist/                       # Vite build output
├── capacitor.config.ts         # Capacitor configuration
└── package.json
```

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Android Studio User Guide](https://developer.android.com/studio/intro)
- [Capacitor CLI Reference](https://capacitorjs.com/docs/cli)

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

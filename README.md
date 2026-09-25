# 🏛️ English-lingou

> **English-lingou: An interactive English learning app and the capital of Virtual Tavana City.**  
> Master English through interactive vocabulary bazaars, grammar blueprints, native speech synthesis, dynamic conversational simulations, and earn golden **Lingous** across city districts.

---

## 🔒 1. API Keys & Automated Security Architecture

All sensitive API keys (including Gemini AI keys) are **strictly isolated and automated on the server side**:

- **Zero Client Exposure:** No API keys are ever bundled into client JavaScript, WebViews, APKs, or AAB files.
- **Secure Server Proxy:** Client requests communicate through authenticated backend proxy endpoints (`/api/ai/evaluate-dialogue`, `/api/ai/explain-word`).
- **Environment Variables:** Credentials are automatically injected via environment variables (`GEMINI_API_KEY`) on Google Cloud / AI Studio container runtimes and local `.env` files (ignored in version control).
- **Graceful Offline Fallback:** If internet access is limited or keys are provisioning, the app falls back to local intelligent heuristics without crashing.

```
[Mobile App / Browser]
       │
       ▼  (HTTPS / REST)
[Node.js Express Server Proxy: /api/*]  <─── Reads process.env.GEMINI_API_KEY
       │
       ▼  (@google/genai SDK)
[Google Gemini 3.8 Flash Engine]
```

---

## 📱 2. Android Build Infrastructure (Gradle, APK & AAB)

The repository includes a ready-to-build Android Gradle project inside `/android`:

### Project Structure:
- `android/build.gradle` - Root Gradle configuration with Android Build Tools 8.3.1.
- `android/settings.gradle` - Project definitions (`English-lingou`).
- `android/app/build.gradle` - App module configuration (SDK 34, namespace `com.siavashstara.englishlingou`).
- `android/app/src/main/AndroidManifest.xml` - Hardware permissions (Internet, Audio Recording, Network State).
- `android/app/src/main/java/com/siavashstara/englishlingou/MainActivity.kt` - Kotlin WebView container with modern DOM storage and audio playback capabilities.

### Automated GitHub Actions Workflow (`.github/workflows/android-build.yml`):
Whenever you push to `main` or push a release tag (`v1.0.0`), GitHub Actions will:
1. Checkout code and setup Node.js 22.
2. Build the web distribution (`npm run build`).
3. Setup JDK 17 & Android SDK.
4. Run `./gradlew assembleRelease` to compile **APK** (`.apk`).
5. Run `./gradlew bundleRelease` to compile Google Play Store **AAB** (`.aab`).
6. Upload both **APK** and **AAB** as downloadable GitHub Artifacts and auto-publish releases for git tags.

### Manual Local Android Build:
```bash
# 1. Build web assets
npm run build

# 2. Build APK
cd android
./gradlew assembleRelease

# 3. Build AAB (for Google Play Store)
./gradlew bundleRelease
```
Output files:
- APK: `android/app/build/outputs/apk/release/app-release-unsigned.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 🚀 3. Getting Started

### Development Mode:
```bash
npm install
npm run dev
```
Runs at `http://localhost:3000`.

### Production Build:
```bash
npm run build
npm start
```

# Android Build & Gradle Setup Instructions

این مخزن برای ساخت بسته‌های اندروید (**APK** و **AAB**) و همچنین اجرای وب تعاملی پیکربندی شده است.

### 1. ساخت خودکار در GitHub Actions (CI/CD)
گردش کار اتوماتیک در مسیر زیر مستقر گردیده است:
`.github/workflows/android-build.yml`
به محض هر push یا ایجاد Release در مخزن، گیت‌هاب اکشنز پروژه را بیلد کرده و بسته‌های نصبی را تولید می‌کند.

### 2. ساخت محلی اندروید (Android Studio & Gradle):
برای خروجی مستقیم روی سیستم خود:
1. ابتدا وب‌اپلیکیشن را کامپایل کنید:
   ```bash
   npm install
   npm run build
   ```
2. با ابزار TWA / Capacitor یا Android Studio پوشه `dist` را در پروژه اندروید قرار داده و فرمان گریدل زیر را اجرا کنید:
   ```bash
   # برای فایل نصبی APK:
   ./gradlew assembleRelease

   # برای پکیج انتشار فروشگاهی AAB (Google Play / بازار):
   ./gradlew bundleRelease
   ```
3. فایل‌های خروجی در مسیرهای زیر تولید می‌شوند:
   - `app/build/outputs/apk/release/app-release.apk`
   - `app/build/outputs/bundle/release/app-release.aab`

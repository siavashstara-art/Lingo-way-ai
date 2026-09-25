# Proguard rules for English-lingou Android App
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keepclassmembers class com.siavashstara.englishlingou.** {
    *;
}

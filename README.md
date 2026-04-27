# 🚗 راهنمای راه‌اندازی Driver Companion

این یه راهنمای **مرحله به مرحله** برای آنلاین کردن اپه. نگران نباش، خیلی ساده‌ست!

---

## 📦 محتوای این پکیج

این یه پروژه کامل React + Vite + PWA هست:
- کد اصلی اپ توی `src/DriverCompanion.jsx`
- پیکربندی Vite، Tailwind، و PWA
- آیکون‌های اپ (PWA)

---

## 🚀 روش ۱: استقرار رایگان روی Vercel (پیشنهادی - ۵ دقیقه)

### مرحله ۱: یه اکانت GitHub بساز (اگه نداری)
1. برو به [github.com](https://github.com)
2. ثبت‌نام کن (رایگان)

### مرحله ۲: پروژه رو بذار روی GitHub
1. توی GitHub، یه repository جدید بساز (مثلاً `driver-companion`)
2. **مهم:** Public باشه یا Private فرقی نمیکنه
3. روی دکمه "uploading an existing file" کلیک کن
4. **همه فایل‌های این پروژه** رو بکش و روی صفحه ول کن
   - ⚠️ پوشه `node_modules` رو آپلود نکن (اگه وجود داشت)
5. "Commit changes" بزن

### مرحله ۳: Vercel رو وصل کن
1. برو به [vercel.com](https://vercel.com)
2. با GitHub وارد شو (Sign in with GitHub)
3. دکمه "Add New Project" بزن
4. repository پروژه‌ت رو انتخاب کن
5. تنظیمات پیش‌فرض رو قبول کن، فقط "Deploy" بزن
6. **تموم!** ⏱ بعد از ۱-۲ دقیقه، یه آدرس بهت میده مثل:
   `driver-companion-xyz.vercel.app`

### مرحله ۴: آدرس ساب‌دامین خودت رو وصل کن

این بخش به ارائه‌دهنده دامنه (مثلاً ایران‌سرور، GoDaddy، Namecheap، Cloudflare) بستگی داره.

**۱. توی Vercel:**
- وارد پروژه شو → Settings → Domains
- ساب‌دامینی که میخوای اضافه کن (مثلاً `driver.mysite.com`)
- Vercel یه آدرس DNS بهت میده، مثلاً:
  ```
  CNAME  driver  cname.vercel-dns.com
  ```

**۲. توی پنل دامنه‌ت:**
- برو به DNS Management
- یه رکورد جدید با اطلاعات بالا اضافه کن:
  - Type: `CNAME`
  - Name/Host: `driver` (یا هر چی Vercel گفت)
  - Value/Target: `cname.vercel-dns.com`
- ذخیره کن

**۳. چند دقیقه/ساعت صبر کن** تا DNS منتشر بشه. Vercel خودش به‌روز میشه و SSL هم اتوماتیک فعال میشه.

### تموم! 🎉
حالا `driver.mysite.com` به اپ وصله.

---

## 💻 روش ۲: تست محلی روی کامپیوتر خودت

اگه میخوای قبل از deploy تست کنی:

### پیش‌نیاز:
- [Node.js](https://nodejs.org) نسخه ۱۸ یا بالاتر

### مراحل:
```bash
# توی پوشه پروژه، ترمینال باز کن
cd driver-companion

# پکیج‌ها رو نصب کن (یه بار اولش)
npm install

# اپ رو اجرا کن
npm run dev
```

بعد آدرس `http://localhost:5173` رو توی مرورگر باز کن.

---

## 🔄 روش ۳: استقرار با Netlify (جایگزین Vercel)

اگه Vercel کار نکرد، Netlify هم رایگانه و خیلی شبیهه:

1. برو به [netlify.com](https://netlify.com)
2. با GitHub وارد شو
3. "Add new site" → "Import from GitHub" → پروژه رو انتخاب کن
4. تنظیمات پیش‌فرض رو قبول کن، Deploy بزن
5. توی Settings → Domain management میتونی ساب‌دامین اضافه کنی

---

## ❓ مشکلات رایج

**سوال:** آپلود فایل‌ها روی GitHub خیلی طول میکشه!
**جواب:** مطمئن شو پوشه `node_modules` رو آپلود نکردی. این پوشه هزاران فایل داره و لازم نیست.

**سوال:** Vercel error میده!
**جواب:** ممکنه فایل `package-lock.json` لازم داشته باشه. یه بار توی کامپیوترت `npm install` بزن، بعد فایل تولید شده رو هم آپلود کن.

**سوال:** ساب‌دامین کار نمیکنه!
**جواب:** DNS ممکنه تا ۲۴ ساعت طول بکشه که منتشر بشه. صبور باش.

**سوال:** میخوام تغییر بدم اپ رو!
**جواب:** فایل `src/DriverCompanion.jsx` رو ویرایش کن. هر بار که توی GitHub commit کنی، Vercel خودکار دوباره deploy میکنه.

---

## 📱 نصب به‌عنوان PWA روی موبایل

بعد از اینکه آنلاین شد:

**iOS (Safari):**
1. آدرس رو باز کن
2. دکمه Share رو بزن
3. "Add to Home Screen" رو انتخاب کن

**Android (Chrome):**
1. آدرس رو باز کن
2. منو بالا سمت راست → "Install app" یا "Add to Home Screen"

حالا اپ مثل اپ‌های واقعی روی صفحه اصلی گوشی نصب میشه! 🎉

---

اگه گیر کردی، بگو تا کمکت کنم 🙂

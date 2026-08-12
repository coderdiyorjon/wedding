# Loyihani O'z Kompyuteringizda Ishga Tushirish

Ushbu qadamlar sizning kompyuteringizda **Node.js** o'rnatilganligini hisobga olgan holda tayyorlangan.

## 1. Terminalni (Buyruqlar satrini) oching
VS Code dasturidan foydalanayotgan bo'lsangiz, `Terminal -> New Terminal` (yoki `Ctrl + \``) orqali terminalni oching. 

Loyiha papkasida ekanligingizga ishonch hosil qiling (`d:/Projects/Toy`).

## 2. Loyiha bog'liqliklarini o'rnating
Birinchi marta ishga tushirishdan oldin, barcha kerakli modullarni (paketlarni) yuklab olishingiz kerak. Terminalga quyidagi buyruqni yozing va `Enter` ni bosing:

```bash
npm install
```
*Bu jarayon internet tezligingizga qarab 1-2 daqiqa vaqt olishi mumkin.*

## 3. Mahalliy serverni (Local Server) ishga tushiring
Modullar o'rnatib bo'lingach, loyihani ishga tushirish uchun quyidagi buyruqni kiriting:

```bash
npm run dev
```

## 4. Brauzerda ko'rish
Yuqoridagi buyruq ishga tushgandan so'ng, terminalda shunga o'xshash yozuv paydo bo'ladi:
```text
  VITE v5.x.x  ready in 450 ms

  ➜  Local:   http://localhost:5173/
```

Klaviatura orqali `Ctrl` (Mac'da `Cmd`) tugmasini bosib turib, `http://localhost:5173/` yozuvi ustiga bosing. Shunda sayt sizning brauzeringizda (Chrome, Safari, Edge) ochiladi.

## Vercel'ga yuklash haqida qisqacha

1. Saytni GitHub'ga yuklang (ushbu papkadagi hamma narsani).
2. [Vercel.com](https://vercel.com) saytiga kiring va GitHub orqali ro'yxatdan o'ting.
3. "Add New Project" tugmasini bosib, GitHub'dagi repozitoriyani tanlang.
4. "Deploy" tugmasini bosing — Vercel qolgan hamma narsani o'zi bajaradi!

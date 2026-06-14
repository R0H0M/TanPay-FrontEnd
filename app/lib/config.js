// app/lib/config.js

export function getBaseUrl() {
  // ۱. اگر روی سرورهای ابری Vercel باشیم
  // متغیر سیستمی VERCEL_URL در ورسل به طور خودکار وجود دارد اما فاقد https:// است
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
  }

  // ۲. حالت لوکال هاست توسعه
  return 'http://localhost:3000/api';
}

// lib/config.js

export function getBaseUrl() {
  // 1. اگر روی Vercel هستیم (آدرس HTTPS باید دستی اضافه شود)
  if (process.env.NEXT_PUBLIC_USE_MOCK) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}`;
  }
  
  // 2. اگر لوکال هستیم (پورت 3000)
  // اگر پورت پروژه شما فرق دارد (مثلا 3001)، اینجا را تغییر دهید
  return process.env.NEXT_PUBLIC_DJANGO_API_URL;
}
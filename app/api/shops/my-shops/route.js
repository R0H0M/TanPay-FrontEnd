// app/api/shops/my-shops/route.js
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// تعریف دیتابیس سراسری برای هماهنگی بین فایل‌ها
if (!global.storeDB) {
  global.storeDB = [
    { id: 1, name: "فروشگاه تست ۱", address: "تهران، ونک", phone: "021888888" },
    { id: 2, name: "فروشگاه تست ۲", address: "تهران، آزادی", phone: "021666666" },
  ];
}

export async function GET() {
  return NextResponse.json(global.storeDB);
}

export async function POST(request) {
  const body = await request.json();
  const newStore = { id: Date.now(), ...body };
  
  global.storeDB.push(newStore); // اضافه کردن به لیست سراسری
  
  return NextResponse.json(newStore, { status: 201 });
}
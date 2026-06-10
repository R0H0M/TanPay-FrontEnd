// app/api/shops/my-shops/[id]/route.js
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  // دریافت آی‌دی فروشگاه از پارامترهای آدرس (مثلاً عدد 1 یا 2)
  const id = Number(params.id);

  if (global.storeDB) {
    // پیدا کردن ایندکس فروشگاه در لیست سراسری
    const index = global.storeDB.findIndex(s => s.id === id);
    
    if (index !== -1) {
      global.storeDB.splice(index, 1); // حذف فیزیکی از لیست سراسری
      return NextResponse.json({ success: true });
    }
  }

  return NextResponse.json({ error: 'فروشگاه یافت نشد' }, { status: 404 });
}
// app/api/companies/register/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();

    // ساخت ساختار مدیر جدید همراه با شرکت ثبت شده
    const newManager = {
      id: Date.now(),
      first_name: body.first_name,
      last_name: body.last_name,
      username: body.username,
      password: body.password || '1234', // پیش‌فرض ۱۲۳۴ برای لاگین‌های بعدی
      email: body.email,
      phone: body.phone,
      role: 'company_manager',
      company: {
        id: Date.now() + 1,
        name: body.company_name,
        national_id: body.national_id,
        phone: body.company_phone,
        address: body.address
      }
    };

    // ذخیره در حافظه سراسری مدیران
    db.managers.push(newManager);

    return NextResponse.json({
      success: true,
      // ساخت توکن اختصاصی حاوی یوزرنیم مدیر
      access: "mock_access_token_manager_" + newManager.username,
      refresh: "mock_refresh_token_" + Date.now(),
      role: "company_manager",
      ...newManager,
      password: undefined
    });

  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "خطا در پردازش اطلاعات ثبت شرکت" }, { status: 500 });
  }
}
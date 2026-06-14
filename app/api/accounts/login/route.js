// app/api/accounts/login/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb'; // ایمپورت دیتابیس تستی مشترک

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // ۱. چک کردن لاگین ادمین (مدیر پیش‌فرض)
    if (username === 'admin' && password === '1234') {
      return NextResponse.json({
        access: "mock_access_token_manager_" + Date.now(),
        refresh: "mock_refresh_token_" + Date.now(),
        role: "company_manager",
        id: 1001,
        username: "admin_user",
        email: "manager@neon.com",
        first_name: "مدیر",
        last_name: "نئونی",
        phone: "09120000000"
      }, { status: 200 });
    }

    // ۲. جستجوی داینامیک در کارمندان ثبت‌شده
    let foundEmployee = db.employees.find(
      emp => emp.username === username && emp.password === password
    );

    // تکنیک دفاعی ایمنی (Fallback):
    // اگر حافظه لوکال ریست نشده باشد، یوزر emp را بازیابی و به رم تزریق می‌کند
    if (!foundEmployee && username === 'emp' && password === '1234') {
      foundEmployee = {
        id: 1,
        first_name: "رهام",
        last_name: "رضوی",
        username: "emp",
        password: "1234",
        role: "employee",
        phone: "09121111111",
        credit_limit: 1500000
      };
      
      if (global.employeeDB) {
        global.employeeDB = global.employeeDB.filter(e => e.id !== 1);
        global.employeeDB.push(foundEmployee);
      }
    }

    if (foundEmployee) {
      return NextResponse.json({
        access: `mock_access_token_emp_${foundEmployee.username}`,
        refresh: "mock_refresh_token_" + Date.now(),
        role: "employee",
        ...foundEmployee,
        password: undefined
      }, { status: 200 });
    }

    // ۳. جستجوی داینامیک در مدیران ثبت‌نام شده جدید (شرکت‌ها)
    let foundManager = db.managers.find(
      m => m.username === username && m.password === password
    );

    if (foundManager) {
      return NextResponse.json({
        access: "mock_access_token_manager_" + foundManager.username,
        refresh: "mock_refresh_token_" + Date.now(),
        role: "company_manager",
        ...foundManager,
        password: undefined
      }, { status: 200 });
    }

    // ۴. اطلاعات اشتباه
    return NextResponse.json(
      { detail: "نام کاربری یا رمز عبور اشتباه است" },
      { status: 401 }
    );

  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ detail: "خطا در پردازش اطلاعات ورود" }, { status: 500 });
  }
}
// app/login/actions.js
"use server";

import { cookies } from 'next/headers';
import { db } from '@/app/lib/mockDb'; // متصل به دیتابیس متمرکز مرحله ۱

export async function loginAction(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // ۱. چک کردن لاگین ادمین (مدیر پیش‌فرض)
  if (username === 'admin' && password === '1234') {
    const fakeToken = "mock_access_token_manager_admin";
    
    // به دلیل استفاده از نسخه 15 نکست جی اس، کوکی ها باید await شوند
    const cookieStore = await cookies();
    cookieStore.set('access', fakeToken, { httpOnly: true, secure: true, path: '/' });
    
    return {
      success: true,
      role: "company_manager",
      user: { id: 1001, username: "admin", first_name: "مدیر", last_name: "نئونی", role: "company_manager" }
    };
  }

  // ۲. چک کردن کارمندان تستی (پیدا کردن مستقیم در رم بدون نیاز به فچ شبکه)
  const foundEmployee = db.employees.find(emp => emp.username === username && emp.password === password);
  if (foundEmployee) {
    const fakeToken = `mock_access_token_emp_${foundEmployee.username}`;
    
    const cookieStore = await cookies();
    cookieStore.set('access', fakeToken, { httpOnly: true, secure: true, path: '/' });
    
    return {
      success: true,
      role: "employee",
      user: { ...foundEmployee, password: undefined }
    };
  }

  // ۳. چک کردن مدیران جدید ثبت‌نام شده
  const foundManager = db.managers.find(m => m.username === username && m.password === password);
  if (foundManager) {
    const fakeToken = `mock_access_token_manager_${foundManager.username}`;
    
    const cookieStore = await cookies();
    cookieStore.set('access', fakeToken, { httpOnly: true, secure: true, path: '/' });
    
    return {
      success: true,
      role: "company_manager",
      user: { ...foundManager, password: undefined }
    };
  }

  return { error: "نام کاربری یا رمز عبور اشتباه است" };
}
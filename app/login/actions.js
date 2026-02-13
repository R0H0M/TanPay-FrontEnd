// app/login/actions.js
"use server";
import { cookies } from 'next/headers';

export async function loginAction(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const res = await fetch(`${process.env.API_URL}/accounts/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.detail || "نام کاربری یا رمز عبور اشتباه است" };
  }

  // ست کردن کوکی‌های امن
(await cookies()).set('access', data.access, { httpOnly: true, secure: true, path: '/' });
(await cookies()).set('role', data.user?.role, { httpOnly: true, secure: true, path: '/' });
  
  return { success: true, role: data.role, user: data };
}
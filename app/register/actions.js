// app/register/actions.js
"use server";
import { cookies } from 'next/headers';

export async function registerAction(formData) {
  const username = formData.get('username');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  // 1. اعتبارسنجی اولیه در سمت سرور
  if (password !== confirmPassword) {
    return { error: "رمز عبور و تکرار آن مطابقت ندارند" };
  }

  // 2. ارسال درخواست به جنگو
  try {
    const res = await fetch(`${process.env.API_URL}/accounts/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        phone,
        password,
        // معمولا در DRF confirmPassword را نیاز نیست بفرستید مگر اینکه سریالایزر خاص نوشته باشید
        // اگر سریالایزر نیاز دارد، این خط را نگه دارید:
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // هندل کردن ارورهای آرایه‌ای که DRF برمی‌گرداند
      let errorMessage = "خطا در ثبت نام";
      if (data.detail) errorMessage = data.detail;
      else if (typeof data === 'object') {
        // مثلا اگر ارور { username: ["This field is required"] } باشد
        const firstKey = Object.keys(data)[0];
        errorMessage = `${firstKey}: ${data[firstKey]}`;
      }
      return { error: errorMessage };
    }

    // 3. ست کردن کوکی‌های امن (اگر بک‌اند بلافاصله توکن برگرداند)
    // نکته: اگر بک‌اند بعد از ثبت نام توکن نمی‌دهد، باید کاربر را به صفحه لاگین هدایت کنید.
    // فرض بر این است که مثل لاگین، توکن‌ها را برمی‌گرداند:
    if (data.access) {
      (await cookies()).set('access', data.access, { httpOnly: true, secure: true, path: '/' });
      (await cookies()).set('role', data.role, { httpOnly: true, secure: true, path: '/' });
    }
    
    return { success: true, role: data.role, user: data };

  } catch (err) {
    return { error: "خطای ارتباط با سرور" };
  }
}
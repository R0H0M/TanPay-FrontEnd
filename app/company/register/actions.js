// app/register-company/actions.js
"use server";
import { cookies } from 'next/headers';

export async function registerCompanyAction(formData) {
  // تبدیل FormData به آبجکت برای ارسال JSON
  const rawData = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    username: formData.get('username'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
    company_name: formData.get('company_name'),
    national_id: formData.get('national_id'),
    company_phone: formData.get('company_phone'),
    address: formData.get('address'),
  };

  try {
    const res = await fetch(`${process.env.API_URL}/companies/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rawData),
    });

    const data = await res.json();

    if (!res.ok) {
        // مدیریت انواع ارورهای DRF
        let errorMessage = 'مشکلی در ثبت شرکت پیش آمد';
        if (data.detail) errorMessage = data.detail;
        else if (typeof data === 'object') {
            const firstKey = Object.keys(data)[0];
            const val = data[firstKey];
            errorMessage = `${firstKey}: ${Array.isArray(val) ? val[0] : val}`;
        }
        return { error: errorMessage };
    }

    // ست کردن کوکی‌های امن در سرور
    if (data.access) {
      (await cookies()).set('access', data.access, { httpOnly: true, secure: true, path: '/' });
      (await cookies()).set('refresh', data.refresh, { httpOnly: true, secure: true, path: '/' });
      (await cookies()).set('role', data.role, { httpOnly: true, secure: true, path: '/' });
    }

    return { 
        success: true, 
        user: {
            id: data.id,
            username: data.username,
            email: data.email,
            phone: data.phone,
            role: 'company-manager',
            first_name: data.first_name,
            last_name: data.last_name,
        },
        company: data.company
    };

  } catch (err) {
    return { error: "خطای ارتباط با سرور" };
  }
}
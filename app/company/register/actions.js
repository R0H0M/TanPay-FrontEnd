// app/register-company/actions.js (یا مسیر ثبت شرکت شما)
'use server'

import { cookies } from 'next/headers'
import { db } from '@/app/lib/mockDb'

export async function registerCompanyAction(formData) {
  const first_name = formData.get('first_name');
  const last_name = formData.get('last_name');
  const username = formData.get('username');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');
  const company_name = formData.get('company_name');
  const national_id = formData.get('national_id');
  const company_phone = formData.get('company_phone');
  const address = formData.get('address');

  const newManager = {
    id: Date.now(),
    first_name,
    last_name,
    username,
    password: password || '1234', // پسورد پیش‌فرض دمو
    email,
    phone,
    role: 'company_manager',
    company: {
      id: Date.now() + 1,
      name: company_name,
      national_id,
      phone: company_phone,
      address
    }
  };

  // ۱. ذخیره مستقیم در دیتابیس تستی مدیران (بدون فچ شبکه)
  db.managers.push(newManager);

  // ۲. تولید توکن تستی داینامیک
  const fakeToken = "mock_access_token_manager_" + newManager.username;
  
  // ۳. ست کردن کوکی بدون کلمه await (مخصوص نکست ۱۴ برای جلوگیری از کرش)
  cookies().set('access', fakeToken, { httpOnly: true, secure: true, path: '/' });

  return {
    success: true,
    user: { ...newManager, password: undefined },
    company: newManager.company
  };
}
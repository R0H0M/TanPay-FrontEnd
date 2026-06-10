"use server";

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { getBaseUrl } from '@/app/lib/config';


// ۱. دریافت لیست کارمندان
export async function getEmployees() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access')?.value;
    const API_URL = getBaseUrl()
        
    try {
        const res = await fetch(`${API_URL}/companies/employees/`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            next: { tags: ['employees-list'] }
        });
        if (!res.ok) return [];
        return await res.json();
    } catch(err) { return []; }
}

// ۲. افزودن کارمند جدید
export async function addEmployeeAction(formData) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access')?.value;
    const API_URL = getBaseUrl()

    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch(`${API_URL}/companies/add-employee/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        
        if (!res.ok) return { error: 'خطا در ثبت کارمند' };
        revalidateTag('employees-list');
        return { success: true };
    } catch(err) { return { error: err || 'خطای شبکه' }; }
}

// ۳. افزایش اعتبار کارمند
export async function rechargeWalletAction(employee_id, amount) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access')?.value;
    const API_URL = getBaseUrl()

    try {
        const res = await fetch(`${API_URL}/companies/employees/increase-credit/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employee_id, amount }),
        });

        if (!res.ok) {
            const data = await res.json()
            return { error: data || 'خطا در شارژ اعتبار' };
        } 
        revalidateTag('employees-list');
        return { success: true };
    } catch(err) { return { error: err || 'خطای سرور' }; }
}

// ۴. اخراج کارمند (اصلاح شد)
export async function deleteEmployee(employee_id) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value
  const API_URL = getBaseUrl()

  try {
    const res = await fetch(`${API_URL}/companies/employees/${employee_id}/`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${accessToken}` 
      },
    })

    if (!res.ok) {
        return { error: 'خطا در اخراج کارمند' }
    }

    // 🔥 تصحیح تگ: باطل کردن کش لیست کارمندان
    revalidateTag('employees-list')

    return { success: true }

  } catch (err) {
    return { error: err || 'خطای سرور' }
  }
}
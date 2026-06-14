// "use server";

// import { cookies } from 'next/headers';
// import { revalidateTag } from 'next/cache';
// import { getBaseUrl } from '@/app/lib/config';


// // ۱. دریافت لیست کارمندان
// export async function getEmployees() {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get('access')?.value;
//     const API_URL = getBaseUrl()
        
//     try {
//         const res = await fetch(`${API_URL}/companies/employees/`, {
//             headers: { 'Authorization': `Bearer ${accessToken}` },
//             next: { tags: ['employees-list'] }
//         });
//         if (!res.ok) return [];
//         return await res.json();
//     } catch(err) { return []; }
// }

// // ۲. افزودن کارمند جدید
// export async function addEmployeeAction(formData) {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get('access')?.value;
//     const API_URL = getBaseUrl()

//     const data = Object.fromEntries(formData.entries());

//     try {
//         const res = await fetch(`${API_URL}/companies/add-employee/`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//         });
        
//         if (!res.ok) return { error: 'خطا در ثبت کارمند' };
//         revalidateTag('employees-list');
//         return { success: true };
//     } catch(err) { return { error: err || 'خطای شبکه' }; }
// }

// // ۳. افزایش اعتبار کارمند
// export async function rechargeWalletAction(employee_id, amount) {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get('access')?.value;
//     const API_URL = getBaseUrl()

//     try {
//         const res = await fetch(`${API_URL}/companies/employees/increase-credit/`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ employee_id, amount }),
//         });

//         if (!res.ok) {
//             const data = await res.json()
//             return { error: data || 'خطا در شارژ اعتبار' };
//         } 
//         revalidateTag('employees-list');
//         return { success: true };
//     } catch(err) { return { error: err || 'خطای سرور' }; }
// }

// // ۴. اخراج کارمند (اصلاح شد)
// export async function deleteEmployee(employee_id) {
//   const cookieStore = await cookies()
//   const accessToken = cookieStore.get('access')?.value
//   const API_URL = getBaseUrl()

//   try {
//     const res = await fetch(`${API_URL}/companies/employees/${employee_id}/`, {
//       method: 'DELETE',
//       headers: { 
//         'Authorization': `Bearer ${accessToken}` 
//       },
//     })

//     if (!res.ok) {
//         return { error: 'خطا در اخراج کارمند' }
//     }

//     // 🔥 تصحیح تگ: باطل کردن کش لیست کارمندان
//     revalidateTag('employees-list')

//     return { success: true }

//   } catch (err) {
//     return { error: err || 'خطای سرور' }
//   }
// }

//تغییر api برای کارکرد صحیح در vercel
// فایل اکشن کارمندان شما
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache' // <--- ۱. اضافه شد
import { db } from '@/app/lib/mockDb'

export async function getEmployees() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) {
    redirect('/login')
  }

  return db.employees;
}

export async function addEmployeeAction(formData) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) {
    redirect('/login')
  }

  const body = Object.fromEntries(formData.entries());
  const employeeName = body.first_name ? `${body.first_name} ${body.last_name || ''}` : (body.username || "کارمند جدید");

  const newEmployee = {
    id: Date.now(),
    first_name: body.first_name || body.name || '',
    last_name: body.last_name || '',
    name: employeeName,
    username: body.username || body.name || `emp_${Date.now().toString().slice(-4)}`,
    password: body.password || '1234',
    email: body.email || '',
    phone: body.phone || '',
    role: body.role || 'employee',
    credit_limit: 0
  };

  db.employees.push(newEmployee);

  // 🔥 ۲. به‌روزرسانی آنی کش صفحه مدیریت کارمندان
  revalidatePath('/manager')

  return { success: true };
}

export async function rechargeWalletAction(employee_id, amount) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) {
    redirect('/login')
  }

  const employee = db.employees.find(emp => emp.id === Number(employee_id));
  if (employee) {
    employee.credit_limit = (Number(employee.credit_limit) || 0) + Number(amount);
    
    // 🔥 ۲. به‌روزرسانی آنی کش صفحه مدیریت و داشبورد کارمند پس از شارژ موفق
    revalidatePath('/manager')
    revalidatePath('/dashboard') 
    return { success: true };
  }

  return { error: 'کارمند یافت نشد' };
}

export async function deleteEmployee(employee_id) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) {
    redirect('/login')
  }

  const index = db.employees.findIndex(emp => emp.id === Number(employee_id));
  if (index !== -1) {
    db.employees.splice(index, 1);
    
    // 🔥 ۲. به‌روزرسانی آنی کش صفحه پس از اخراج موفق کارمند
    revalidatePath('/manager')
    return { success: true };
  }

  return { error: 'کارمند یافت نشد' };
}
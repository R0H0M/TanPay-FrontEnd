// app/actions/auth.js
'use server'

import { cookies } from 'next/headers'
import { db } from '@/app/lib/mockDb'
import { redirect } from 'next/navigation'

export async function getMeAction() {
  const cookieStore = await cookies()
  const access = cookieStore.get('access')?.value

  if (!access) return { user: null }

  // ۱. بررسی داینامیک توکن کارمند
  if (access.startsWith('mock_access_token_emp_')) {
    const usernameFromToken = access.replace('mock_access_token_emp_', '');
    const employee = db.employees.find(emp => emp.username === usernameFromToken);
    if (employee) {
      return { user: { ...employee, role: "employee", password: undefined } };
    }
  }

  // ۲. بررسی داینامیک مدیران ثبت‌شده
  if (access.startsWith('mock_access_token_manager_')) {
    const usernameFromToken = access.replace('mock_access_token_manager_', '');
    const manager = db.managers.find(m => m.username === usernameFromToken);
    if (manager) {
      return { 
        user: { 
          ...manager, 
          role: "company_manager", 
          password: undefined,
          company_id: manager.company?.id,
          company_name: manager.company?.name,
          company: manager.company
        } 
      };
    }
  }

  // ۳. فال‌بک پیش‌فرض
  return {
    user: {
      id: 1001, username: "admin_user", email: "manager@neon.com", phone: "09120000000",
      first_name: "مدیر", last_name: "نئونی", role: "company_manager",
      company_id: 1, company_name: "شرکت نئون"
    }
  };
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('access')
  cookieStore.delete('refresh')
  return { success: true }
}
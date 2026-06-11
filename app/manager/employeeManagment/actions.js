// فایل اکشن کارمندان شما
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/app/lib/mockDb'

export async function getEmployees() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) {
    redirect('/login')
  }

  // خواندن مستقیم از رم
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

  // پوش مستقیم کارمند جدید
  db.employees.push(newEmployee);

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
    // افزایش اعتبار در حافظه رم
    employee.credit_limit = (Number(employee.credit_limit) || 0) + Number(amount);
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
    db.employees.splice(index, 1); // حذف مستقیم کارمند
    return { success: true };
  }

  return { error: 'کارمند یافت نشد' };
}
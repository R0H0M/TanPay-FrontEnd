// app/api/accounts/me/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ detail: "Credentials not provided." }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  // ۱. بررسی داینامیک توکن کارمند
  if (token.startsWith('mock_access_token_emp_')) {
    const usernameFromToken = token.replace('mock_access_token_emp_', '');
    const employee = db.employees.find(emp => emp.username === usernameFromToken);
    if (employee) {
      return NextResponse.json({ ...employee, role: "employee", password: undefined });
    }
  }

  // ۲. بررسی داینامیک مدیران ثبت‌شده
  if (token.startsWith('mock_access_token_manager_')) {
    const usernameFromToken = token.replace('mock_access_token_manager_', '');
    const manager = db.managers.find(m => m.username === usernameFromToken);
    if (manager) {
      return NextResponse.json({
        ...manager,
        role: "company_manager",
        password: undefined,
        company_id: manager.company?.id,
        company_name: manager.company?.name,
        company: manager.company
      });
    }
  }

  // ۳. فال‌بک پیش‌فرض
  return NextResponse.json({
    id: 1001, username: "admin_user", email: "manager@neon.com", phone: "09120000000",
    first_name: "مدیر", last_name: "نئونی", role: "company_manager",
    company_id: 1, company_name: "شرکت نئون"
  });
}
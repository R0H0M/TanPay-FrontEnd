// app/api/companies/add-employee/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
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
    return NextResponse.json({ success: true, employee: newEmployee }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "خطا در پردازش اطلاعات" }, { status: 500 });
  }
}
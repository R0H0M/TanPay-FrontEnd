// app/api/companies/employees/increase-credit/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { employee_id, amount } = body;

    const employee = db.employees.find(emp => emp.id === Number(employee_id));
    
    if (employee) {
      employee.credit_limit = (Number(employee.credit_limit) || 0) + Number(amount);
      return NextResponse.json({ success: true, employee });
    }

    return NextResponse.json({ error: "کارمند یافت نشد" }, { status: 404 });
  } catch (err) {
    console.error("Recharge API Error:", err);
    return NextResponse.json({ error: "خطا در شارژ اعتبار" }, { status: 500 });
  }
}
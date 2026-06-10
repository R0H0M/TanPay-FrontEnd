// app/api/companies/employees/[id]/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  const id = Number(params.id);

  const index = db.employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    db.employees.splice(index, 1); // حذف از مرجع اصلی
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "کارمند یافت نشد" }, { status: 404 });
}
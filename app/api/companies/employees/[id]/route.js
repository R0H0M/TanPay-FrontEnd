// app/api/companies/employees/[id]/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }) {
  const resolvedParams = await params; // اول باید params را await کنید
  const id = Number(resolvedParams.id);
}
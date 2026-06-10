// app/api/companies/employees/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(db.employees);
}
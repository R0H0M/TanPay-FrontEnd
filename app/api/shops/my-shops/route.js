// app/api/shops/my-shops/route.js
import { NextResponse } from 'next/server';
import { db } from '@/app/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(db.stores);
}

export async function POST(request) {
  const body = await request.json();
  const newStore = { 
    id: Date.now(), 
    name: body.name, 
    address: body.address, 
    phone: body.phone, 
    contract_date: body.contract_date
  };
  db.stores.push(newStore);
  return NextResponse.json(newStore, { status: 201 });
}
// app/manager/stores/actions.js
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/app/lib/mockDb'

export async function getCompanyStores() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) {
    redirect('/login')
  }

  // خواندن مستقیم از رم
  return db.stores;
}

export async function addStoreAction(formData) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) {
    redirect('/login')
  }

  const newStore = {
    id: Date.now(),
    name: formData.get('name'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    contract_date: formData.get('contract_date')
  };

  // پوش مستقیم در رم
  db.stores.push(newStore);

  return { success: true };
}

export async function deleteStoreAction(storeId) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) {
    redirect('/login')
  }

  const index = db.stores.findIndex(s => s.id === Number(storeId));
  if (index !== -1) {
    db.stores.splice(index, 1); // حذف مستقیم از رم
    return { success: true };
  }

  return { error: 'فروشگاه یافت نشد' };
}
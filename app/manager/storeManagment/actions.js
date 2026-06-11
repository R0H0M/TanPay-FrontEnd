// app/manager/stores/actions.js
'use server'

import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { getBaseUrl } from '@/app/lib/config'


/**
 * دریافت لیست فروشگاه‌ها
 */
export async function getCompanyStores() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value
  const API_URL = getBaseUrl()

  if (!accessToken) return []

  try {
    const res = await fetch(`${API_URL}/shops/my-shops/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      next: {
        tags: ['company-stores'],
        revalidate: 3600 
      }
    })

    if (!res.ok) return []
    return await res.json()
  } catch (err) {
    console.error('Fetch Error:', err)
    return []
  }
}

/**
 * افزودن فروشگاه جدید
 */
export async function addStoreAction(formData) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value
  const API_URL = getBaseUrl()

  const payload = {
    name: formData.get('name'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    contract_date: formData.get('contract_date')
  }

  try {
    const res = await fetch(`${API_URL}/shops/my-shops/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data || 'خطا در ثبت فروشگاه' }
    }

    revalidateTag('company-stores')
    return { success: true }

  } catch (err) {
    return { error: err || 'خطای ارتباط با سرور' }
  }
}

/**
 * حذف فروشگاه (اصلاح شد)
 */
export async function deleteStoreAction(storeId) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value
  const API_URL = getBaseUrl() // <--- این خط اضافه شد تا متغیر آدرس برای حذف در دسترس باشد

  try {
    const res = await fetch(`${API_URL}/shops/my-shops/${storeId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      return { error: 'خطا در حذف فروشگاه' }
    }

    revalidateTag('company-stores')
    return { success: true }

  } catch (err) {
    return { error: 'خطای سرور' }
  }
}
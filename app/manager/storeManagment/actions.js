// app/manager/stores/actions.js
'use server'

import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'


/**
 * دریافت لیست فروشگاه‌ها
 * این تابع از کش استفاده می‌کند و تگ 'company-stores' را دارد.
 */
export async function getCompanyStores() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  if (!accessToken) return []

  try {
    // فرض بر این است که اندپوینت دریافت لیست و ساختن یکی است
    const res = await fetch(`${process.env.API_URL}/shops/my-shops/`, {
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      // نکته مهم: استفاده از تگ برای مدیریت کش
      next: { 
        tags: ['company-stores'],
        revalidate: 3600 // (اختیاری) کش تا یک ساعت معتبر است
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
 * پس از موفقیت، تگ 'company-stores' را باطل می‌کند.
 */
export async function addStoreAction(formData) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value
  
  // تبدیل FormData به JSON
  const payload = {
    name: formData.get('name'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    contract_date: formData.get('contract_date')
    // سایر فیلدها اگر نیاز بود...
  }

  try {
    const res = await fetch(`${process.env.API_URL}/shops/create/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
        // مدیریت خطاهای احتمالی از سمت بک‌اند
        return { error: data || 'خطا در ثبت فروشگاه' }
    }

    // 🔥 کلید طلایی: باطل کردن کش
    // تمام صفحاتی که از تگ company-stores استفاده می‌کنند، آپدیت می‌شوند
    revalidateTag('company-stores')

    return { success: true }

  } catch (err) {
    return { error: 'خطای ارتباط با سرور' }
  }
}

/**
 * حذف فروشگاه
 * پس از موفقیت، کش را باطل می‌کند.
 */
export async function deleteStoreAction(storeId) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access')?.value

  try {
    const res = await fetch(`${process.env.API_URL}/shops/${storeId}/`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${accessToken}` 
      },
    })

    if (!res.ok) {
        return { error: 'خطا در حذف فروشگاه' }
    }

    // 🔥 اینجا هم کش را باطل می‌کنیم تا آیتم حذف شده از لیست همه غیب شود
    revalidateTag('company-stores')

    return { success: true }

  } catch (err) {
    return { error: 'خطای سرور' }
  }
}
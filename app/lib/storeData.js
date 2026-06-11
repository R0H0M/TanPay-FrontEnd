// lib/api.js (یا هر فایلی که تابع getStores شما در آن قرار دارد)
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/app/lib/mockDb';

export async function getStores() {
    const cookieStore = cookies(); // بدون کلمه await برای نکست ۱۴
    const accessToken = cookieStore.get('access')?.value;

    // اگر کاربر لاگین نبود، مستقیماً به صفحه لاگین هدایت شود
    if (!accessToken) {
        redirect('/login');
    }

    // خواندن مستقیم از رم بدون فچ شبکه!
    return db.stores;
}
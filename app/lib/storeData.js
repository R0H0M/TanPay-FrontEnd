// lib/api.js
import { cookies } from 'next/headers';

export async function getStores() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access')?.value;

    if (!accessToken) {
        throw new Error('توکن دسترسی یافت نشد.');
    }

    const res = await fetch(`${process.env.API_URL}/shops/my-shops/`, {
        headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        // به جای no-store از تگ استفاده می‌کنیم
        next: { 
            tags: ['company-stores'], // <--- این کلید طلایی اشتراک کش است
            revalidate: 3600 // (اختیاری) کش تا یک ساعت معتبر است مگر اینکه دستی باطل شود
        } 
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'خطا در دریافت اطلاعات');
    }
    
    return res.json();
}
// middleware.js
import { NextResponse } from 'next/server';

// تابع کمکی برای تشخیص هوشمند نقش کاربر از روی توکن
function getUserRoleFromToken(token) {
  if (!token) return null;

  const t = token.toLowerCase();

  // ۱. شناسایی هوشمند نقش مدیر (چه با خط فاصله، چه آندرلاین یا کلمه کلیدی manager)
  if (t.includes('manager')) return 'company_manager';
  
  // ۲. شناسایی هوشمند نقش کارمند
  if (t.includes('emp') || t.includes('employee')) return 'employee';

  // ۳. روش جایگزین: تلاش برای دکود کردن JWT واقعی بک‌ند جنگو
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      const role = payload.role ? payload.role.toLowerCase() : '';
      
      if (role.includes('manager')) return 'company_manager';
      if (role.includes('employee') || role.includes('emp')) return 'employee';
    }
  } catch (e) {
    return null;
  }
  return null;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // خواندن کوکی توکن دسترسی (HttpOnly)
  const token = request.cookies.get('access')?.value;
  const role = getUserRoleFromToken(token);

  // تعریف گروه‌های آدرس‌دهی
  const isAuthRoute = ['/login', '/company/register'].some(route => pathname.startsWith(route));
  const isManagerRoute = pathname.startsWith('/manager');
  const isEmployeeRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/employee');
  const isStoresRoute = pathname.startsWith('/stores'); 

  // سناریو ۱: کاربر لاگین نکرده است
  if (!token) {
    // جلوگیری از دسترسی به پنل مدیریت، پنل کارمند و صفحه فروشگاه‌ها و انتقال به لاگین
    if (isManagerRoute || isEmployeeRoute || isStoresRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // سناریو ۲: کاربر لاگین کرده است
  if (token) {
    // جلوگیری از دسترسی به صفحات ورود و ثبت‌نام و انتقال به پنل مربوطه بر اساس نقش
    if (isAuthRoute) {
      const redirectUrl = role === 'company_manager' ? '/manager' : '/dashboard';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // 🔥 محافظت شدید: جلوگیری از ورود مدیر کمپانی به پنل کارمند (/dashboard)
    if (role === 'company_manager' && isEmployeeRoute) {
      return NextResponse.redirect(new URL('/manager', request.url));
    }

    // 🔥 محافظت شدید: جلوگیری از ورود کارمند به پنل مدیریت شرکت (/manager)
    if (role === 'employee' && isManagerRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// کانفیگ برای بهینه‌سازی اجرای میدل‌ویر و مستثنی کردن فایل‌های استاتیک و تصاویر
export const config = {
  matcher: [
    /*
     * اعمال فیلتر بر روی تمام مسیرها به جز:
     * - api (روت‌های بک‌ند فرضی)
     * - static, image, favicon (فایل‌های گرافیکی و وب‌پک)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
};
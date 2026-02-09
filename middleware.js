import { NextResponse } from 'next/server'

export async function middleware(request) {
  // ۱. گرفتن توکن از کوکی‌ها (در میدل‌ویر نیازی به await برای cookies نیست)
  const token = request.cookies.get('access')?.value
  const { pathname } = request.nextUrl

  // ۲. مسیرهای محافظت شده
  const isManagerRoute = pathname.startsWith('/manager')
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')

  // سناریو الف: کاربر لاگین نکرده و می‌خواهد وارد پنل شود
  if ((isManagerRoute || isDashboardRoute) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // سناریو ب: کاربر لاگین کرده و می‌خواهد دوباره به صفحه لاگین برود
  if (isAuthRoute && token) {
    // اگر مدیر است به پنل مدیریت، وگرنه به داشبورد معمولی برود
    const role = request.cookies.get('role')?.value
    const target = role === 'company_manager' ? '/manager' : '/dashboard'
    return NextResponse.redirect(new URL(target, request.url))
  }

  return NextResponse.next()
}

// تنظیمات برای اینکه میدل‌ویر روی چه مسیرهایی اجرا شود
export const config = {
  matcher: [
    '/manager/:path*', 
    '/dashboard/:path*', 
    '/login', 
    '/register'
  ],
}
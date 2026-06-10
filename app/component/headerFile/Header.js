'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react' // useEffect و useRef از قبل موجود بودند
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'
import { logoutAction } from '@/app/actions/auth'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const { user, setUser, setCompany, loading } = useUser()

  // --- منطق اسکرول هوشمند هدر ---
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // --- ۲. رفع مشکل اسکرول به بالا در هنگام جابجایی بین صفحات ---
  useEffect(() => {
    // اسکرول به بالای صفحه در زمان تغییر آدرس
    window.scrollTo(0, 0);
    // هدر را هم ریست کنیم تا در بالای صفحه جدید حتماً نشان داده شود
    setVisible(true); 
  }, [pathname])

  // --- ۱. عدم نمایش هدر در صفحه لاگین (و صفحات دلخواه دیگر) ---
  const excludedPaths = ['/login']; // اگر مایل بودید می‌توانید مسیرهای دیگری مثل '/company/register' را هم اضافه کنید
  if (excludedPaths.includes(pathname)) {
    return null; // هدر رندر نمی‌شود
  }

  const isActive = (path) => pathname === path

  const handleLogout = async () => {
    try {
      await logoutAction()
      if (setUser) setUser(null)
      if (setCompany) setCompany(null)
      router.push('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <header 
      dir="rtl" 
      className={`sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-fuchsia-500/20 font-iransans transition-transform duration-300 ease-in-out
        ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-fuchsia-400 hover:opacity-80 transition cursor-pointer select-none">
          Tan<span className="text-white">Pay</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-zinc-300">
          <Link 
            href="/" 
            className={`transition ${isActive('/') ? 'text-fuchsia-400 font-bold text-glow' : 'hover:text-fuchsia-400'}`}
          >
            خانه
          </Link>
          
          <button 
            onClick={() => setShowHowItWorks(true)}
            className="hover:text-fuchsia-400 transition cursor-pointer text-sm"
          >
            نحوه عملکرد
          </button>
          
          <Link 
            href="/stores" 
            className={`transition ${isActive('/stores') ? 'text-fuchsia-400 font-bold text-glow' : 'hover:text-fuchsia-400'}`}
          >
            فروشگاه‌ها
          </Link>
          
          <Link 
            href="/about" 
            className={`transition ${isActive('/about') ? 'text-fuchsia-400 font-bold text-glow' : 'hover:text-fuchsia-400'}`}
          >
            درباره ما
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 min-w-[150px] justify-end">
          {loading ? (
            <div className="w-28 h-9 bg-zinc-900 border border-white/5 rounded-lg animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4 animate-in fade-in duration-300">
              <Link
                href={user.role === 'company_manager' ? '/manager' : '/dashboard'}
                className="text-zinc-300 text-sm font-semibold hover:text-fuchsia-400 transition hover:text-glow"
              >
                {user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.username} خوش آمدید
              </Link>
              
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg border border-red-500/40
                           text-red-400 hover:bg-red-500/10 transition text-sm cursor-pointer"
              >
                خروج
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg border border-fuchsia-500/40
                           text-fuchsia-400 hover:bg-fuchsia-500/10 transition text-sm"
              >
                ورود
              </Link>
              <Link href='/company/register'>
                <button
                  className="px-6 py-2 rounded-lg bg-fuchsia-500 text-black font-semibold text-sm
                             hover:bg-fuchsia-400 transition cursor-pointer
                             shadow-[0_0_20px_rgba(217,70,239,0.5)]"
                >
                  شروع همکاری
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-fuchsia-400 text-2xl cursor-pointer"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-zinc-950 border-t border-fuchsia-500/20 px-6 py-6 space-y-4 text-zinc-300">
          <Link href="/" className="block hover:text-fuchsia-400">خانه</Link>
          
          <button 
            onClick={() => {
              setShowHowItWorks(true);
              setOpen(false);
            }}
            className="block w-full text-right hover:text-fuchsia-400 cursor-pointer"
          >
            نحوه عملکرد
          </button>
          
          <Link href="/stores" className="block hover:text-fuchsia-400">فروشگاه‌ها</Link>
          <Link href="/about" className="block hover:text-fuchsia-400">درباره ما</Link>

          {/* مدیریت وضعیت لود موبایل */}
          <div className="pt-4 flex flex-col gap-3">
            {loading ? (
              <div className="w-full h-10 bg-zinc-900 border border-white/5 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="flex flex-col gap-3 text-center animate-in fade-in duration-300">
                <Link
                  href={user.role === 'company_manager' ? '/manager' : '/dashboard'}
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 text-sm font-semibold py-2 hover:text-fuchsia-400"
                >
                  خوش آمدید، {user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 rounded-lg border border-red-500/40 text-red-400 text-sm cursor-pointer"
                >
                  خروج از حساب
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                <Link
                  href="/login"
                  className="text-center py-2 rounded-lg border border-fuchsia-500/40
                             text-fuchsia-400"
                >
                  ورود
                </Link>

                <Link href='/company/register'>
                  <button
                    className="py-2 rounded-lg bg-fuchsia-500 text-black font-semibold w-full cursor-pointer"
                  >
                    شروع همکاری
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- HOW IT WORKS NEON MODAL --- */}
      {showHowItWorks && (
        <div className="fixed top-72 inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={() => setShowHowItWorks(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-xl bg-zinc-900 border border-fuchsia-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(217,70,239,0.15)] animate-in fade-in zoom-in duration-300">
            <button 
                onClick={() => setShowHowItWorks(false)}
                className="absolute top-4 left-4 text-zinc-500 hover:text-white transition"
            >
                ✕
            </button>

            <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-white">
                  نحوه عملکرد سیستم <span className="text-fuchsia-500 text-glow">TanPay</span>
                </h3>
                <p className="text-zinc-500 text-sm mt-1">تخصیص هوشمند اعتبار خرید رفاهی کارمندان</p>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-6 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-fuchsia-500/10">
                
                {/* Step 1 */}
                <div className="relative pr-10 flex flex-col gap-1">
                    <div className="absolute right-2 top-1 w-5 h-5 rounded-full bg-zinc-950 border-2 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)] flex items-center justify-center text-[10px] font-bold text-fuchsia-400">۱</div>
                    <h4 className="text-sm font-bold text-white">ثبت‌نام و عضویت شرکت</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">صاحبان کسب‌وکار و شرکت‌ها با ثبت مشخصات حقوقی، پنل اختصاصی مدیریت سازمان خود را در TanPay ایجاد می‌کنند.</p>
                </div>

                {/* Step 2 */}
                <div className="relative pr-10 flex flex-col gap-1">
                    <div className="absolute right-2 top-1 w-5 h-5 rounded-full bg-zinc-950 border-2 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)] flex items-center justify-center text-[10px] font-bold text-fuchsia-400">۲</div>
                    <h4 className="text-sm font-bold text-white">افزودن کارمندان به پنل</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">مدیر شرکت می‌تواند کارمندان خود را به صورت نامحدود در پنل تعریف کرده و برای آن‌ها نام کاربری و پسورد ورود بسازد.</p>
                </div>

                {/* Step 3 */}
                <div className="relative pr-10 flex flex-col gap-1">
                    <div className="absolute right-2 top-1 w-5 h-5 rounded-full bg-zinc-950 border-2 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)] flex items-center justify-center text-[10px] font-bold text-fuchsia-400">۳</div>
                    <h4 className="text-sm font-bold text-white">تخصیص اعتبار کیف پول رفاهی</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">مدیریت شرکت با شارژ اعتبار ریالی هر کارمند، بودجه رفاهی مشخصی برای خرید آن‌ها اختصاص می‌دهد.</p>
                </div>

                {/* Step 4 */}
                <div className="relative pr-10 flex flex-col gap-1">
                    <div className="absolute right-2 top-1 w-5 h-5 rounded-full bg-zinc-950 border-2 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)] flex items-center justify-center text-[10px] font-bold text-fuchsia-400">۴</div>
                    <h4 className="text-sm font-bold text-white">خرید هوشمند و آسان از فروشگاه‌ها</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">کارمندان با ورود به پنل شخصی خود، لیست فروشگاه‌های همکار را مشاهده کرده و بدون نیاز به کارت بانکی، به راحتی با اعتبار کیف پول خرید می‌کنند.</p>
                </div>

            </div>

            <button 
                onClick={() => setShowHowItWorks(false)}
                className="w-full mt-8 py-3 rounded-xl bg-fuchsia-500 text-black font-bold text-sm hover:bg-fuchsia-400 transition shadow-[0_0_20px_rgba(217,70,239,0.2)]"
            >
                متوجه شدم، بستن پنجره
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
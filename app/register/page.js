'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../context/UserContext'
import { registerAction } from './actions'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useUser()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister(formData) {
    setLoading(true)
    setError('')

    const result = await registerAction(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      // آپدیت کانتکست
      setUser(result.user)
      // ریدایرکت بر اساس نقش
      router.push(result.role === 'company_manager' ? '/manager/storeManagment' : '/credit')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 overflow-hidden relative py-10">
      {/* Glow Effect */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-900/10 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-lg bg-zinc-900/80 backdrop-blur-xl rounded-2xl
                      shadow-[0_0_50px_rgba(217,70,239,0.15)]
                      p-8 border border-white/5 font-iransans transition-all hover:border-fuchsia-500/30">

        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-3 tracking-tight">
              عضویت در <span className="text-fuchsia-500 text-glow">نئون</span>
            </h1>
            <p className="text-zinc-500 text-sm">ساخت حساب کاربری جدید</p>
        </div>

        {error && (
          <div className="mb-6 text-red-400 text-sm bg-red-500/5 border border-red-500/20 p-4 rounded-xl animate-shake text-center">
            {error}
          </div>
        )}

        <form action={handleRegister} className="space-y-5">
          
          {/* نام کاربری */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 mr-2 uppercase tracking-widest">نام کاربری</label>
            <input
              name="username"
              required
              autoComplete="off"
              className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/5 
                         focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ایمیل */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 mr-2 uppercase tracking-widest">ایمیل</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/5 
                           focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-zinc-700"
              />
            </div>

            {/* موبایل */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 mr-2 uppercase tracking-widest">موبایل</label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/5 
                           focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>

          {/* رمز عبور */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 mr-2 uppercase tracking-widest">رمز عبور</label>
            <div className="relative">
              <input
                name="password"
                required
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/5 
                           focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-zinc-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-fuchsia-400 transition-colors text-xs font-bold"
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {/* تکرار رمز عبور */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-500 mr-2 uppercase tracking-widest">تکرار رمز عبور</label>
            <input
              name="confirmPassword"
              required
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/5 
                         focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 rounded-xl font-bold text-black bg-fuchsia-500 
                       hover:bg-fuchsia-400 transition-all active:scale-[0.98] 
                       shadow-[0_10px_20px_rgba(217,70,239,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                در حال ایجاد حساب...
              </span>
            ) : 'ثبت نام نهایی'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-500 text-sm">
              حساب کاربری دارید؟ <Link href="/login" className="text-fuchsia-500 hover:underline">وارد شوید</Link>
            </p>
        </div>
      </div>
    </div>
  )
}
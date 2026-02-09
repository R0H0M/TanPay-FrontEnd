'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// import Cookies from 'js-cookie' // این را حذف کنید
import { useUser } from '../context/UserContext'
import { loginAction } from './actions'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useUser()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

 async function handleLogin(formData) {
    setLoading(true)
    setError('')
    const result = await loginAction(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setUser(result.user)
      router.push(result.role === 'company_manager' ? '/manager/storeManagment' : '/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 overflow-hidden relative">
      {/* Glow Effect تقویت شده */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-900/10 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-md bg-zinc-900/80 backdrop-blur-xl rounded-2xl
                      shadow-[0_0_50px_rgba(217,70,239,0.15)]
                      p-8 border border-white/5 font-iransans transition-all hover:border-fuchsia-500/30">

        <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
              ورود <span className="text-fuchsia-500 text-glow">تن پی</span>
            </h1>
            <p className="text-zinc-500 text-sm">مدیریت هوشمند فروشگاه‌های زنجیره‌ای</p>
        </div>

        {error && (
          <div className="mb-6 text-red-400 text-sm bg-red-500/5 border border-red-500/20 p-4 rounded-xl animate-shake">
            {error}
          </div>
        )}

        <form action={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 mr-2 uppercase tracking-widest">نام کاربری</label>
            <input
              name="username"
              autoComplete='off'
              required
              className="w-full px-4 py-4 bg-black/40 text-white rounded-xl border border-white/5 
                         focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-zinc-700"
              placeholder="username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 mr-2 uppercase tracking-widest">رمز عبور</label>
            <div className="relative">
              <input
                name="password"
                required
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-4 bg-black/40 text-white rounded-xl border border-white/5 
                           focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-zinc-700"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-fuchsia-400 transition-colors"
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-black bg-fuchsia-500 
                       hover:bg-fuchsia-400 transition-all active:scale-[0.98] 
                       shadow-[0_10px_20px_rgba(217,70,239,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                در حال پردازش...
              </span>
            ) : 'تایید و ورود به سیستم'}
          </button>
        </form>

      </div>
    </div>
  )
}
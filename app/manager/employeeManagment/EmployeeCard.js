'use client'
import { useState } from 'react'
import { rechargeWalletAction, deleteEmployee } from './actions'

export default function EmployeeCard({ employee }) {
  // تفکیک وضعیت‌های لودینگ برای جلوگیری از تداخل دکمه‌ها
  const [recharging, setRecharging] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // نکته منطقی: اگر می‌خواهید اعتبار زیر ۱۰ هزار تومان قرمز شود، باید علامت بزرگتر را به کوچکتر (<) تغییر دهید
  // در حال حاضر طبق کد پیش‌فرض شما، مبالغ بالای ۱۰ هزار تومان قرمز و غیرقابل افزایش می‌شوند
  const isLowBalance = employee.credit_limit > 2000000

  const handleRecharge = async () => {
    setRecharging(true)
    // ارسال شناسه کارمند و مبلغ ۵۰,۰۰۰ تومان متناسب با متن دکمه فرانت‌اند شما
    const res = await rechargeWalletAction(String(employee.id), 50000)
    console.log(res);
    setRecharging(false)
  }

  async function handleDelete() {
    setDeleting(true)
    const res = await deleteEmployee(employee.id)
    console.log(res);
    setDeleting(false)
  }

  return (
    <div className={`relative bg-zinc-900/40 border ${isLowBalance ? 'border-red-500/30' : 'border-white/5'} rounded-2xl p-6 transition-all hover:shadow-xl font-iransans`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold border border-white/10">
          {(employee.username?.[0] || employee.name?.[0] || 'U').toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-lg">
            {employee.username || employee.name || 'کارمند بدون نام'}
          </h3>
        </div>
      </div>

      <div className="bg-black/40 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-500">اعتبار فعلی:</span>
          <span className={`font-mono font-bold ${isLowBalance ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
            {/* اصلاح نمایش: در صورت خالی بودن، عدد 0 نشان داده می‌شود */}
            {(employee.credit_limit ?? 0).toLocaleString()} تومان
          </span>
        </div>
      </div>

      <button
        onClick={handleRecharge}
        // غیرفعال کردن دکمه در صورت لودینگ یا پر بودن اعتبار
        disabled={recharging || deleting || isLowBalance}
        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
          ${isLowBalance
            ? 'bg-red-500/10 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
            : 'bg-zinc-800 text-zinc-300 hover:text-black'}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
        </svg>
        {isLowBalance ? 'قابل افزایش نیست' : recharging ? 'در حال شارژ...' : 'شارژ اعتبار (۵۰,۰۰۰)'}
      </button>

      <button
        onClick={handleDelete}
        // غیرفعال کردن دکمه در صورت لودینگ عملیات دیگر
        disabled={recharging || deleting}
        className="w-full mt-3 py-3 rounded-xl hover:text-white font-bold transition-all flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] disabled:opacity-50"
      >
        {deleting ? 'در حال اخراج...' : 'اخراج'}
      </button>
    </div>
  )
}
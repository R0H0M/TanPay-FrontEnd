'use client'
import { useState } from 'react'
import { rechargeWalletAction, deleteEmployee } from './actions'

export default function EmployeeCard({ employee }) {
  const [loading, setLoading] = useState(false)
  const isLowBalance = employee.credit_limit > 10000

  const handleRecharge = async () => {
    setLoading(true)
    // به طور پیش‌فرض ۵۰ هزار تومان شارژ می‌کند (قابل تغییر)
    const res = await rechargeWalletAction(String(employee.id), 10.00)
    console.log(res);
    setLoading(false)
  }

  async function handleDelete(employee_id) {
    setLoading(true)
    const res = await deleteEmployee(employee.id)
    console.log(res);
    setLoading(false)
  }

  return (
    <div className={`relative bg-zinc-900/40 border ${isLowBalance ? 'border-red-500/30' : 'border-white/5'} rounded-2xl p-6 transition-all hover:shadow-xl`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold border border-white/10">
          {employee.username[0].toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-lg">{employee.username}</h3>
          <p className="text-zinc-500 text-xs">{employee.role === 'employee' ? 'صندوق‌دار' : 'مدیر انبار'}</p>
        </div>
      </div>

      <div className="bg-black/40 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-500">اعتبار فعلی:</span>
          <span className={`font-mono font-bold ${isLowBalance ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
            {employee.credit_limit?.toLocaleString()} تومان
          </span>
        </div>
      </div>

      <button
        onClick={handleRecharge}
        disabled={loading || isLowBalance}
        
        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
          ${isLowBalance 
            ? 'bg-red-500/10 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
            : 'bg-zinc-800 text-zinc-300  hover:text-black'}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
        </svg>
        {isLowBalance ? 'قابل افزایش نیست' : loading ? 'در حال شارژ...' : 'شارژ اعتبار (۵۰,۰۰۰)'}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`w-full py-3 rounded-xl hover:text-white font-bold transition-all flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]`}
      >اخراج</button>
    </div>
  )
}
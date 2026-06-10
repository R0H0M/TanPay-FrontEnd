'use client'

import { useUser } from '../context/UserContext'

const transactions = [
  {
    id: 1,
    store: 'دیجیتال استور',
    amount: 1200000,
    date: '1403/05/12',
    status: 'موفق',
  },
  {
    id: 2,
    store: 'پوشاک مدرن',
    amount: 850000,
    date: '1403/05/02',
    status: 'موفق',
  },
  {
    id: 3,
    store: 'سوپرمارکت شهر',
    amount: 430000,
    date: '1403/04/25',
    status: 'لغو شده',
  },
]

export default function EmployeeDashboard() {
  const { user } = useUser()

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] gap-4">
        <span className="w-10 h-10 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin" />
        <span className="text-zinc-500 text-sm font-iransans">در حال بارگذاری اطلاعات پنل...</span>
      </div>
    )
  }

  const fullName = user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.username;

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white px-6 py-12 relative overflow-hidden font-iransans">
      
      {/* Glow Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/5 blur-[130px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-black text-white tracking-tight">
          پنل <span className="text-fuchsia-500 text-glow">کاربر نئون</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          مدیریت هوشمند اعتبار خرید و گزارش تراکنش‌ها
        </p>
      </div>

      {/* Grid: Profile and Credit Card */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        {/* Profile Card (2 Cols) */}
        <div className="lg:col-span-2 bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 hover:border-fuchsia-500/20 transition-all duration-300">
          {/* Glowing Avatar */}
          <div className="relative">
            <div className="absolute inset-0 bg-fuchsia-500/20 blur-[20px] rounded-full" />
            <div className="relative w-24 h-20 md:w-24 md:h-24 rounded-full bg-zinc-950 border-2 border-fuchsia-500/40 flex items-center justify-center text-3xl font-black text-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.15)]">
              {(user.username?.[0] || user.first_name?.[0] || 'U').toUpperCase()}
            </div>
          </div>

          {/* Profile Fields Grid */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-wider">نام و نام خانوادگی</span>
              <span className="text-sm font-bold text-zinc-200">{fullName}</span>
            </div>
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-wider">نام کاربری</span>
              <span className="text-sm font-bold text-zinc-200">{user.username}</span>
            </div>
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-wider">شماره تماس</span>
              <span className="text-sm font-bold text-zinc-200">{user.phone || 'ثبت نشده'}</span>
            </div>
            <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-wider">نقش سیستم</span>
              <span className="text-sm font-bold text-fuchsia-400">
                {user.role === 'employee' ? 'کارمند رسمی' : 'مدیر شرکت'}
              </span>
            </div>
          </div>
        </div>

        {/* Futuristic Credit Card (1 Col) */}
        <div>
          <CreditCard
            title="اعتبار کل اختصاصی"
            value={user.credit_limit}
            unit="تومان"
            holderName={fullName}
          />
        </div>

      </div>

      {/* Transactions Table */}
      <div className="max-w-7xl mx-auto bg-zinc-900/20 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-fuchsia-500/10 transition-all duration-300">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-fuchsia-400">
            تراکنش‌های اخیر کاربری
          </h2>
          <span className="text-xs text-zinc-500">بروزرسانی لحظه‌ای</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-black/40 text-zinc-400 text-xs font-bold uppercase tracking-wider border-b border-white/5">
              <tr>
                <th className="p-5">فروشگاه زنجیره‌ای</th>
                <th className="p-5">مبلغ تراکنش</th>
                <th className="p-5">تاریخ خرید</th>
                <th className="p-5">وضعیت پرداخت</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-5 font-semibold text-zinc-300">{tx.store}</td>
                  <td className="p-5 font-mono font-bold text-fuchsia-400 text-glow">
                    {tx.amount.toLocaleString()} تومان
                  </td>
                  <td className="p-5 text-sm text-zinc-400 font-mono">{tx.date}</td>
                  <td className="p-5">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

/* ---------- Reusable Subcomponents ---------- */

function CreditCard({ title, value, unit, holderName }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900 via-black to-zinc-950 p-6 border border-fuchsia-500/20 shadow-[0_0_40px_rgba(217,70,239,0.1)] flex flex-col justify-between min-h-[220px] group hover:border-fuchsia-500/40 transition-all duration-300">
      
      {/* Futuristic Background Mesh */}
      <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-fuchsia-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-fuchsia-500/15 transition-all duration-300" />
      
      {/* Top Card Info */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">کیف پول اعتباری</span>
        <span className="text-lg font-black text-fuchsia-400 tracking-wider">Tan<span className="text-white">Pay</span></span>
      </div>

      {/* Chipset Icon & Amount */}
      <div className="my-5 z-10">
        {/* Chipset Icon (Futuristic) */}
        <svg className="w-8 h-8 mb-3 text-fuchsia-500/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M8 6v12M16 6v12M3 12h18" />
        </svg>
        
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-white tracking-tight text-glow font-mono">
            {Number(value ?? 0).toLocaleString()}
          </h3>
          <span className="text-xs text-zinc-500 font-semibold">{unit}</span>
        </div>
      </div>

      {/* Bottom Card Holder Details */}
      <div className="flex justify-between items-end z-10">
        <div>
          <span className="text-[9px] text-zinc-500 block mb-0.5 uppercase">دارنده کارت</span>
          <span className="text-xs font-bold text-zinc-300">{holderName}</span>
        </div>
        <div className="text-left">
          <span className="text-[9px] text-zinc-500 block mb-0.5 uppercase">وضعیت</span>
          <span className="text-[10px] font-bold text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded border border-fuchsia-500/20">
            فعال
          </span>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const isSuccess = status === 'موفق'

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide
        ${isSuccess
          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
          : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
    >
      {status}
    </span>
  )
}
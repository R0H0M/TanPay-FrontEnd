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
  const { user } = useUser() // گرفتن اطلاعات کاربر از Context
  console.log(user);
  if (!user) return <div className="min-h-screen flex items-center justify-center text-white">در حال بارگذاری...</div>

  return (
    <main dir="rtl" className="min-h-screen bg-zinc-950 text-white px-6 py-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-fuchsia-400">
          پنل کارمند
        </h1>
        <p className="text-zinc-400 mt-2">
          مشاهده اعتبار و تراکنش‌های شما
        </p>

        {/* User Info */}
        <div className="mt-4 text-zinc-200">
          <p>نام کاربری: <span className="text-white font-semibold">{user.username}</span></p>
          <p>ایمیل: <span className="text-white font-semibold">{user.email}</span></p>
          <p>شماره تماس: <span className="text-white font-semibold">{user.phone}</span></p>
          <p>نقش: <span className="text-fuchsia-400 font-semibold">{user.role === 'employee' ? 'کارمند' : 'مدیر کمپانی'}</span></p>
        </div>
      </div>

      {/* Credit Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 mb-12">
        <CreditCard
          title="اعتبار کل"
          value={user.credit_limit}
          unit="تومان"
        />
      </div>

      {/* Transactions */}
      <div className="max-w-7xl mx-auto bg-black border border-fuchsia-500/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-fuchsia-500/20">
          <h2 className="text-xl font-bold text-fuchsia-400">
            تراکنش‌های اخیر
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-zinc-900 text-zinc-400 text-sm">
              <tr>
                <th className="p-4">فروشگاه</th>
                <th className="p-4">مبلغ</th>
                <th className="p-4">تاریخ</th>
                <th className="p-4">وضعیت</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-t border-zinc-800 hover:bg-zinc-900/60 transition"
                >
                  <td className="p-4">{tx.store}</td>
                  <td className="p-4 text-fuchsia-300">
                    {tx.amount.toLocaleString()} تومان
                  </td>
                  <td className="p-4">{tx.date}</td>
                  <td className="p-4">
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

/* ---------- Components ---------- */

function CreditCard({ title, value, unit, highlight }) {
  return (
    <div
      className={`rounded-2xl p-6 border
        ${highlight
          ? 'bg-linear-to-br from-fuchsia-600/20 to-black border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.4)]'
          : 'bg-black border-zinc-800'}`}
    >
      <p className="text-zinc-400 mb-2">{title}</p>
      <h3 className="text-2xl font-extrabold text-white">
        {value}
        <span className="text-sm text-zinc-400 mr-2">{unit}</span>
      </h3>
    </div>
  )
}

function StatusBadge({ status }) {
  const isSuccess = status === 'موفق'

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium
        ${isSuccess
          ? 'bg-green-500/20 text-green-400'
          : 'bg-red-500/20 text-red-400'}`}
    >
      {status}
    </span>
  )
}

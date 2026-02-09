'use client'

import Link from 'next/link'
import { useUser } from '../context/UserContext'

export default function ManagerHome() {
  const { user } = useUser()

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-zinc-950 text-white px-6 py-12"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-fuchsia-400">
          داشبورد مدیر کمپانی
        </h1>
        <p className="text-zinc-400 mt-2">
          خوش آمدید {user?.username || 'مدیر'}
        </p>
      </div>

      {/* Manager Info */}
      <div className="max-w-7xl mx-auto mb-12">
        <div
          className="bg-black border border-fuchsia-500/30 rounded-2xl p-6
                     shadow-[0_0_35px_rgba(217,70,239,0.25)]"
        >
          <h2 className="text-xl font-bold text-fuchsia-400 mb-4">
            اطلاعات مدیر کمپانی
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoItem label="نام کاربری" value={user?.username} />
            <InfoItem label="ایمیل" value={user?.email} />
            <InfoItem label="نقش" value="مدیر کمپانی" />
            <InfoItem label="شناسه کاربر" value={user?.id} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <StatCard title="فروشگاه‌های فعال" value="0" />
        <StatCard title="تعداد کارمندان" value="0" />
      </div>

      {/* Quick Access */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        <ManagerCard
          title="مدیریت فروشگاه‌ها"
          description="افزودن، حذف و مشاهده فروشگاه‌های طرف قرارداد"
          href="/manager/storeManagment"
          icon="🏬"
        />

        <ManagerCard
          title="مدیریت کارمندان"
          description="افزودن کارمند و ویرایش اعتبار"
          href="/manager/employeeManagment"
          icon="👥"
        />
      </div>
    </main>
  )
}

/* ---------------- COMPONENTS ---------------- */

function InfoItem({ label, value }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
      <p className="text-sm text-zinc-400 mb-1">{label}</p>
      <p className="font-semibold text-white truncate">
        {value || '—'}
      </p>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div
      className="bg-black border border-zinc-800 rounded-2xl p-6
                 hover:border-fuchsia-500 transition"
    >
      <p className="text-zinc-400 mb-2">{title}</p>
      <p className="text-2xl font-extrabold text-fuchsia-400">
        {value}
      </p>
    </div>
  )
}

function ManagerCard({ title, description, href, icon }) {
  return (
    <Link href={href}>
      <div
        className="group cursor-pointer bg-black border border-zinc-800
                   rounded-2xl p-8
                   hover:border-fuchsia-500
                   hover:shadow-[0_0_40px_rgba(217,70,239,0.35)]
                   transition"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl">{icon}</span>
          <h2 className="text-2xl font-bold text-fuchsia-400">
            {title}
          </h2>
        </div>

        <p className="text-zinc-400 mb-8">
          {description}
        </p>

        <span className="inline-block text-fuchsia-400 font-semibold">
          ورود به بخش →
        </span>
      </div>
    </Link>
  )
}

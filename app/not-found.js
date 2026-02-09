'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6"
    >
      <div className="text-center max-w-md">

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-fuchsia-500 mb-6">
          ۴۰۴
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-bold mb-3">
          صفحه‌ای که دنبال آن هستید پیدا نشد
        </h2>

        <p className="text-zinc-400 mb-8 leading-relaxed">
          ممکن است آدرس را اشتباه وارد کرده باشید
          یا این صفحه حذف شده باشد.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 transition font-medium"
          >
            بازگشت به صفحه اصلی
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-fuchsia-500 transition text-zinc-300"
          >
            بازگشت به صفحه قبل
          </button>
        </div>

      </div>
    </main>
  )
}

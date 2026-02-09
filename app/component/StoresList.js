// component/StoresList.jsx
'use client'

import { useState } from 'react'
import StoreCard from './storeCard/StoreCard'

export default function StoresList({ initialStores, errorMessage }) {
  const [search, setSearch] = useState('')
  
  // اگر خطایی از سمت سرور آمده باشد، اینجا نمایش می‌دهیم
  if (errorMessage) {
    return (
        <main dir="rtl" className="min-h-screen bg-zinc-950 text-white px-6 py-10 flex items-center justify-center">
             <p className="text-red-500 text-lg">{errorMessage}</p>
        </main>
    )
  }

  // فیلتر کردن فروشگاه‌ها بر اساس جستجو
  const filteredStores = initialStores.filter((store) =>
    `${store.name} ${store.address} ${store.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <main dir="rtl" className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-fuchsia-400">
          فروشگاه‌های طرف قرارداد
        </h1>
        <p className="text-zinc-400 mt-2">
          فروشگاه مورد نظر خود را جستجو کنید
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجو بر اساس نام، آدرس یا شماره تماس..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-black border border-zinc-800 rounded-xl
              px-5 py-4 pr-12 text-white
              focus:outline-none focus:border-fuchsia-500
              placeholder:text-zinc-500
            "
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
            🔍
          </span>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {filteredStores.length === 0 ? (
          <p className="text-zinc-400 col-span-full text-center">
            فروشگاهی با این مشخصات یافت نشد
          </p>
        ) : (
          filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))
        )}
      </div>
    </main>
  )
}
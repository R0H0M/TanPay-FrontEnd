import { getCompanyStores } from './actions'
import AddStoreModal from './AddStoreModal'
import StoreCard from './StoreCard'

export default async function StoresPage() {
  const stores = await getCompanyStores()

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-iransans relative overflow-hidden">
      {/* Background Glow تقویت شده */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.1)]">
                {/* آیکون Store بصورت SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-500">
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight leading-none">
                  مدیریت <span className="text-fuchsia-500">فروشگاه‌ها</span>
                </h1>
                <p className="text-zinc-500 text-sm mt-2 font-medium">لیست شعب فعال و زیرمجموعه</p>
              </div>
            </div>
          </div>

          <AddStoreModal />
        </div>

        {/* Stores Grid */}
        {stores && stores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800 rounded-[2.5rem] bg-zinc-900/10 backdrop-blur-sm">
            <div className="p-5 bg-zinc-900 rounded-full mb-6 border border-zinc-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700">
                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p className="text-zinc-500 font-bold text-lg">هنوز هیچ فروشگاهی ثبت نکرده‌اید</p>
            <p className="text-zinc-600 text-sm mt-1">از دکمه بالا برای اضافه کردن اولین شعبه استفاده کنید</p>
          </div>
        )}
      </div>
    </main>
  )
}
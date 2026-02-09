'use client'
import { useState } from 'react'
import { addStoreAction } from './actions'

export default function AddStoreModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData) {
    const result = await addStoreAction(formData)
    if (result?.success) {
      setIsOpen(false)
      e.target.reset()
    } else {
      alert(result.error)
    }
    setLoading(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)] active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        افزودن فروشگاه جدید
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 transition-opacity">
          <div className="relative bg-[#0a0a0a] border border-fuchsia-500/30 w-full max-w-md rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-fuchsia-500">ثبت شعبه جدید</h2>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mr-1">Store Name</label>
                <input name="name" required className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mr-1">Address</label>
                <input name="address" required className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mr-1">Phone</label>
                <input name="phone" className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mr-1">Phone</label>
                <input name="contract_date" type='date' className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500 outline-none transition-all" />
              </div>

              <button 
                disabled={loading}
                className="w-full py-4 bg-fuchsia-600 text-black font-black rounded-xl mt-6 hover:bg-fuchsia-500 disabled:opacity-50 transition-all shadow-lg active:scale-[0.98]"
              >
                {loading ? 'در حال پردازش...' : 'تایید و ثبت نهایی'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
'use client'
import { deleteStoreAction } from './actions'
import { useState } from 'react'

export default function StoreCard({ store }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`آیا از حذف فروشگاه "${store.name}" مطمئن هستید؟`)) return
    setIsDeleting(true)
    const result = await deleteStoreAction(store.id)
    if (result.error) {
      alert(result.error)
      setIsDeleting(false)
    }
  }

  return (
    <div className="group relative bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all hover:border-fuchsia-500/40 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">{store.name}</h3>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-30"
        >
          {/* آیکون سطل زباله SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <svg className="text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{store.address || 'آدرس ثبت نشده'}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <svg className="text-fuchsia-600" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>{store.phone || 'بدون شماره تماس'}</span>
        </div>
      </div>
    </div>
  )
}
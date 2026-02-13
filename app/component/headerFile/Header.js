'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '@/app/context/UserContext'
import { logoutAction } from '@/app/actions/auth'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  

  return (
    <header dir="rtl" className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-fuchsia-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-extrabold text-fuchsia-400">
          Tan<span className="text-white">Pay</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-zinc-300">
          <Link href="/" className="hover:text-fuchsia-400 transition">خانه</Link>
          <Link href="#" className="hover:text-fuchsia-400 transition">نحوه عملکرد</Link>
          <Link href="/stores" className="hover:text-fuchsia-400 transition">فروشگاه‌ها</Link>
          <Link href="#" className="hover:text-fuchsia-400 transition">درباره ما</Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-fuchsia-500/40
                       text-fuchsia-400 hover:bg-fuchsia-500/10 transition"
          >
            ورود
          </Link>
          <Link href='/company/register'>
          <button
            className="px-6 py-2 rounded-lg bg-fuchsia-500 text-black font-semibold
                       hover:bg-fuchsia-400 transition
                       shadow-[0_0_20px_rgba(217,70,239,0.5)]"
          >
            شروع همکاری
          </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-fuchsia-400 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-zinc-950 border-t border-fuchsia-500/20 px-6 py-6 space-y-4 text-zinc-300">
          <a href="#" className="block hover:text-fuchsia-400">خانه</a>
          <a href="#" className="block hover:text-fuchsia-400">نحوه عملکرد</a>
          <a href="#" className="block hover:text-fuchsia-400">فروشگاه‌ها</a>
          <a href="#" className="block hover:text-fuchsia-400">درباره ما</a>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/login"
              className="text-center py-2 rounded-lg border border-fuchsia-500/40
                         text-fuchsia-400"
            >
              ورود
            </Link>

            <Link href='/company/register'>
            <button
              className="py-2 rounded-lg bg-fuchsia-500 text-black font-semibold"
            >
              شروع همکاری
            </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

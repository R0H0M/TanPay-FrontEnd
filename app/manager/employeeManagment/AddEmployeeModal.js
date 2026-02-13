'use client'
import { useState, useRef } from 'react' // اضافه کردن useRef
import { addEmployeeAction } from './actions'

export default function AddEmployeeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null) // برای دسترسی به فرم و ریست کردن آن

  async function handleSubmit(formData) {
    // برای دیباگ و دیدن محتویات FormData این خط را امتحان کن:
    console.log(formData.get('username'));
    console.log("Data:", Object.fromEntries(formData.entries()));
    
    setLoading(true)
    const res = await addEmployeeAction(formData)
    
    if (res.success) {
        setIsOpen(false)
        formRef.current?.reset() // ریست کردن فرم با استفاده از Ref
    } else {
        alert(res.error || "خطایی رخ داد")
    }
    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95">
        + افزودن کارمند جدید
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-blue-500/30 w-full max-w-md rounded-2xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-blue-500 mb-6">ثبت اطلاعات کارمند</h2>
            
            {/* استفاده از ref و action */}
            <form ref={formRef} action={handleSubmit} className="space-y-4">
              <input name="username" required placeholder="نام کاربری" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white" />
              <input name="first_name" required placeholder="نام" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white" />
              <input name="last_name" required placeholder="نام خانوادگی" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white" />
              <input name="email" required placeholder="ایمیل" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white" />
              <input name="phone" placeholder="شماره تماس" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white" />
              <input name="credit_limit" placeholder="میزان اعتبار" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white" />
              <input name="password" placeholder="رمز عبور" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white" />
              
              <button disabled={loading} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl mt-4 hover:bg-blue-500 transition-all disabled:opacity-50">
                {loading ? 'در حال ثبت...' : 'تایید و ساخت حساب'}
              </button>
              <button type="button" onClick={() => setIsOpen(false)} className="w-full text-zinc-500 text-sm mt-2">انصراف</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
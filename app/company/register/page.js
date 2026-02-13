'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCompany } from '@/app/context/CompanyContext'
import { useUser } from '@/app/context/UserContext'
import { registerCompanyAction } from './actions'

export default function RegisterCompanyPage() {
    const router = useRouter()
    // const { setCompany } = useCompany()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // تابع هندلر که به اکشن سرور متصل می‌شود
    async function handleRegister(formData) {
        setLoading(true)
        setError('')
        setSuccess('')

        const result = await registerCompanyAction(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        } else {
            // آپدیت کانتکست سمت کلاینت
            setUser(result.user)
            // setCompany(result.company)

            setSuccess('شرکت با موفقیت ثبت شد 🎉')
            
            // انتقال به صفحه مدیریت
            router.push('/manager')
        }
    }

    return (
        <main dir="rtl" className="min-h-screen bg-zinc-950 text-white px-6 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-fuchsia-400 mb-6">
                    ثبت شرکت
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-500/10 text-green-400 rounded">
                        {success}
                    </div>
                )}

                {/* استفاده از action به جای onSubmit */}
                <form action={handleRegister} className="space-y-8">

                    {/* اطلاعات مدیر */}
                    <Section title="اطلاعات مدیر شرکت">
                        <Grid>
                            <Input label="نام" name="first_name" />
                            <Input label="نام خانوادگی" name="last_name" />
                            <Input label="نام کاربری" name="username" />
                            <Input label="ایمیل" name="email" type="email" />
                            <Input label="شماره تماس" name="phone" />
                            <Input label="رمز عبور" name="password" type="password" />
                        </Grid>
                    </Section>

                    {/* اطلاعات شرکت */}
                    <Section title="اطلاعات شرکت">
                        <Grid>
                            <Input label="نام شرکت" name="company_name" />
                            <Input label="شناسه ملی" name="national_id" />
                            <Input label="تلفن شرکت" name="company_phone" />
                            <Input label="آدرس" name="address" />
                        </Grid>
                    </Section>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 font-bold transition disabled:opacity-50"
                    >
                        {loading ? 'در حال ثبت...' : 'ثبت شرکت'}
                    </button>
                </form>
            </div>
        </main>
    )
}

/* ---------- UI Helpers (بدون تغییر) ---------- */

function Section({ title, children }) {
    return (
        <section className="bg-black border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-fuchsia-400 mb-4">{title}</h2>
            {children}
        </section>
    )
}

function Grid({ children }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
}

function Input({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm text-zinc-400 mb-1">{label}</label>
            <input
                autoComplete="off"
                required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl
          text-white focus:outline-none focus:border-fuchsia-500 transition"
                {...props}
            />
        </div>
    )
}
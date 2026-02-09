'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getMeAction, logoutAction } from '@/app/actions/auth' // مسیر فایل اکشن را درست وارد کنید

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  // تابع دریافت اطلاعات کاربر (از طریق Server Action)
  const fetchUser = async () => {
    try {
      setLoading(true)
      const { user, error } = await getMeAction()
      
      if (user) {
        setUser(user)
        // اگر دیتای شرکت هم در user موجود است اینجا ست کنید
        // اگر نه، و نیاز به فچ جداگانه دارد، یک اکشن دیگر بسازید
      } else {
        // اگر کاربر لاگین نبود یا توکن نامعتبر بود
        setUser(null)
      }
    } catch (err) {
      console.error(err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // خروج از حساب
  const logout = async () => {
    await logoutAction()
    setUser(null)
    setCompany(null)
    router.push('/login')
  }

  // اجرا در زمان لود صفحه
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ 
        user, 
        setUser, 
        company, 
        setCompany, 
        loading, 
        fetchUser, // اکسپورت می‌کنیم تا بعد از آپدیت پروفایل بتوان صدا زد
        logout 
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
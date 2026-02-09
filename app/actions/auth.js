// app/actions/auth.js
'use server'

import { cookies } from 'next/headers'


export async function getMeAction() {
  const cookieStore = await cookies()
  const access = cookieStore.get('access')?.value

  if (!access) return { user: null }

  try {
    const res = await fetch(`${process.env.API_URL}/accounts/me/`, {
      headers: { 
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!res.ok) {
        // اگر توکن اکسپایر شده بود، اینجا می‌توان تلاش برای رفرش کرد
        // اما برای سادگی فعلا نال برمی‌گردانیم تا کلاینت ریدایرکت شود
        return { user: null, error: res.status }
    }

    const user = await res.json()
    return { user }
  } catch (err) {
    return { user: null, error: err.message }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('access')
  cookieStore.delete('refresh')
  return { success: true }
}
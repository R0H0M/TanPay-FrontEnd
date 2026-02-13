// 'use client'

// import { createContext, useContext, useState, useEffect } from 'react'
// import Cookies from 'js-cookie'

// const CompanyContext = createContext()

// export const CompanyProvider = ({ children }) => {
//   const [company, setCompany] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const API_URL = 'http://10.72.48.121:8000/api'

//   // دریافت اطلاعات شرکت
//   const fetchCompany = async () => {
//     const access = Cookies.get('access')
//     if (!access) {
//       setCompany(null)
//       setLoading(false)
//       return
//     }

//     try {
//       console.log('company me request')

//       const res = await fetch(`${API_URL}/accounts/me/`, {
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       })

//       if (!res.ok) {
//         const data = await res.json()
//         console.log(data);
//         const refreshed = await refreshAccessToken()
//         if (refreshed) {
//           await fetchCompany()
//         } else {
//           setCompany(null)
//         }
//       } else {
//         const data = await res.json()
//         setCompany(data)
//       }
//     } catch (err) {
//       setCompany(null)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // رفرش access token
//   const refreshAccessToken = async () => {
//     const refresh = Cookies.get('refresh')
//     if (!refresh) return false

//     try {
//       console.log('refresh token request')

//       const res = await fetch(`${API_URL}/accounts/refresh/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ refresh }),
//       })

//       if (!res.ok) return false

//       const data = await res.json()
//       Cookies.set('access', data.access, { expires: 1, sameSite: 'Lax' })
//       return true
//     } catch {
//       return false
//     }
//   }

//   useEffect(() => {
//     fetchCompany()
//   }, [])

//   return (
//     <CompanyContext.Provider
//       value={{
//         company,
//         setCompany,
//         loading,
//         refetchCompany: fetchCompany,
//       }}
//     >
//       {children}
//     </CompanyContext.Provider>
//   )
// }

// export const useCompany = () => useContext(CompanyContext)

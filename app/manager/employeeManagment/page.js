import { getEmployees } from './actions'
import AddEmployeeModal from './AddEmployeeModal'
import EmployeeCard from './EmployeeCard'

export default async function EmployeesPage() {
  const employees = await getEmployees()

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-iransans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h1 className="text-3xl font-black tracking-tight">مدیریت <span className="text-blue-500">کارمندان</span></h1>
            </div>
            <p className="text-zinc-500 text-sm">کنترل دسترسی و مدیریت اعتبار کیف پول پرسنل</p>
          </div>
          <AddEmployeeModal />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      </div>
    </main>
  )
}
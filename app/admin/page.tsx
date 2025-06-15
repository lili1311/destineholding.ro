import { getLeads, getStats } from "@/app/actions/lead-actions"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  try {
    const leads = await getLeads()
    const stats = await getStats()

    return (
      <div className="min-h-screen bg-gray-50">
        <AdminDashboard leads={leads} stats={stats} />
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Eroare Dashboard</h1>
          <p className="text-gray-600">A apărut o eroare la încărcarea dashboard-ului.</p>
        </div>
      </div>
    )
  }
}

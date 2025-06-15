import { getLeads, getStats } from "@/app/actions/lead-actions"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const leads = await getLeads()
  const stats = await getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>VERSIUNE DEMO:</strong> Lead-urile se salvează temporar. Pentru salvare permanentă și email-uri
              automate, configurează Supabase și Resend în variabilele de mediu.
            </p>
          </div>
        </div>
      </div>

      <AdminDashboard leads={leads} stats={stats} />
    </div>
  )
}

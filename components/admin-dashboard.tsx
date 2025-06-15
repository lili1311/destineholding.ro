"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Eye, Download, Filter, AlertCircle } from "lucide-react"
import { updateLeadStatus } from "@/app/actions/lead-actions"

type Lead = {
  id: string
  nume: string
  prenume: string
  email: string
  telefon: string
  tip_asigurare: string
  mesaj: string
  status: "nou" | "contactat" | "vandut" | "refuzat"
  created_at: string
}

type Stats = {
  total: number
  nou: number
  contactat: number
  vandut: number
  refuzat: number
  astazi: number
}

interface AdminDashboardProps {
  leads: Lead[]
  stats: Stats
}

export function AdminDashboard({ leads, stats }: AdminDashboardProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("toate")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const filteredLeads = selectedStatus === "toate" ? leads : leads.filter((lead) => lead.status === selectedStatus)

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const result = await updateLeadStatus(leadId, newStatus)
    if (result.success) {
      window.location.reload()
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Nume", "Prenume", "Email", "Telefon", "Tip Asigurare", "Status", "Data"],
      ...leads.map((lead) => [
        lead.nume,
        lead.prenume,
        lead.email,
        lead.telefon,
        lead.tip_asigurare,
        lead.status,
        new Date(lead.created_at).toLocaleDateString("ro-RO"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-destine-holding-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nou":
        return "bg-blue-100 text-blue-800"
      case "contactat":
        return "bg-yellow-100 text-yellow-800"
      case "vandut":
        return "bg-green-100 text-green-800"
      case "refuzat":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin - Destine Holding</h1>
        <p className="text-gray-600">Gestionează lead-urile și monitorizează performanța site-ului</p>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Versiune Demo</h3>
              <p className="text-sm text-blue-700 mt-1">
                Lead-urile se salvează temporar în memorie. Pentru salvare permanentă și email-uri automate,
                configurează Supabase și Resend în variabilele de mediu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Lead-uri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Astăzi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.astazi}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Noi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.nou}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Contactați</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.contactat}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vânduți</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.vandut}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Refuzați</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.refuzat}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="toate">Toate ({leads.length})</option>
            <option value="nou">Noi ({stats.nou})</option>
            <option value="contactat">Contactați ({stats.contactat})</option>
            <option value="vandut">Vânduți ({stats.vandut})</option>
            <option value="refuzat">Refuzați ({stats.refuzat})</option>
          </select>
        </div>

        <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead-uri ({filteredLeads.length})</CardTitle>
          <CardDescription>Lista cu toate persoanele care au completat formularul de contact</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Nu există lead-uri încă. Primul lead va apărea aici când cineva completează formularul.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Client</th>
                    <th className="text-left p-2">Contact</th>
                    <th className="text-left p-2">Asigurare</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Data</th>
                    <th className="text-left p-2">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <div>
                          <div className="font-medium">
                            {lead.nume} {lead.prenume}
                          </div>
                          {lead.mesaj && <div className="text-sm text-gray-500 truncate max-w-xs">{lead.mesaj}</div>}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="space-y-1">
                          <a
                            href={`tel:${lead.telefon}`}
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Phone className="h-3 w-3" />
                            {lead.telefon}
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </a>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className="text-sm">{lead.tip_asigurare}</span>
                      </td>
                      <td className="p-2">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(lead.status)}`}
                        >
                          <option value="nou">Nou</option>
                          <option value="contactat">Contactat</option>
                          <option value="vandut">Vândut</option>
                          <option value="refuzat">Refuzat</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <div className="text-sm text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString("ro-RO")}
                          <br />
                          {new Date(lead.created_at).toLocaleTimeString("ro-RO", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="p-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedLead(lead)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">
                  {selectedLead.nume} {selectedLead.prenume}
                </h3>
                <Button variant="outline" size="sm" onClick={() => setSelectedLead(null)}>
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-sm">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Telefon</label>
                    <p className="text-sm">{selectedLead.telefon}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Tip Asigurare</label>
                  <p className="text-sm">{selectedLead.tip_asigurare}</p>
                </div>

                {selectedLead.mesaj && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Mesaj</label>
                    <p className="text-sm bg-gray-50 p-3 rounded">{selectedLead.mesaj}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <a href={`tel:${selectedLead.telefon}`}>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Sună
                    </Button>
                  </a>
                  <a href={`mailto:${selectedLead.email}`}>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

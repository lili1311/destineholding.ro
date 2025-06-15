"use server"

// Stocare în memorie - funcționează fără configurări
let tempLeads: any[] = []

export async function submitLead(formData: FormData) {
  try {
    const leadData = {
      nume: formData.get("nume") as string,
      prenume: formData.get("prenume") as string,
      email: formData.get("email") as string,
      telefon: formData.get("telefon") as string,
      tip_asigurare: formData.get("serviciu") as string,
      mesaj: formData.get("mesaj") as string,
      status: "nou" as const,
    }

    // Validare de bază
    if (!leadData.nume || !leadData.prenume || !leadData.email || !leadData.telefon) {
      return {
        success: false,
        error: "Toate câmpurile obligatorii trebuie completate",
      }
    }

    // Salvare temporară
    const newLead = {
      ...leadData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }

    tempLeads.unshift(newLead)

    // Limitează la ultimele 50 de lead-uri
    if (tempLeads.length > 50) {
      tempLeads = tempLeads.slice(0, 50)
    }

    // Log pentru debugging
    console.log("📧 LEAD NOU:", {
      nume: `${leadData.nume} ${leadData.prenume}`,
      email: leadData.email,
      telefon: leadData.telefon,
      tip_asigurare: leadData.tip_asigurare,
      data: new Date().toLocaleString("ro-RO"),
    })

    return {
      success: true,
      message: "Mulțumim! Te vom contacta în cel mai scurt timp.",
      data: newLead,
    }
  } catch (error) {
    console.error("Eroare submitLead:", error)
    return {
      success: false,
      error: "A apărut o eroare. Te rugăm să suni direct la 0726 171 050.",
    }
  }
}

export async function updateLeadStatus(leadId: string, status: string) {
  try {
    const leadIndex = tempLeads.findIndex((lead) => lead.id === leadId)
    if (leadIndex !== -1) {
      tempLeads[leadIndex].status = status
    }
    return { success: true }
  } catch (error) {
    return { success: false, error: "Eroare la actualizarea statusului" }
  }
}

export async function getLeads() {
  return tempLeads
}

export async function getStats() {
  const leads = tempLeads

  if (!leads.length) return { total: 0, nou: 0, contactat: 0, vandut: 0, refuzat: 0, astazi: 0 }

  const today = new Date().toDateString()
  const astazi = leads.filter((lead) => new Date(lead.created_at).toDateString() === today).length

  const stats = leads.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1
      acc.total++
      return acc
    },
    { total: 0, nou: 0, contactat: 0, vandut: 0, refuzat: 0, astazi },
  )

  return stats
}

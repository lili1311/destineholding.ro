"use server"

// Stocare temporară pentru demo - funcționează fără configurări externe
let tempLeads: any[] = []

export async function submitLead(formData: FormData) {
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

  try {
    // Salvare temporară - funcționează întotdeauna
    const newLead = {
      ...leadData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }

    tempLeads.unshift(newLead)

    // Limitează la ultimele 100 de lead-uri
    if (tempLeads.length > 100) {
      tempLeads = tempLeads.slice(0, 100)
    }

    // Simulare trimitere email
    console.log("📧 LEAD NOU PRIMIT:", {
      nume: `${leadData.nume} ${leadData.prenume}`,
      email: leadData.email,
      telefon: leadData.telefon,
      tip_asigurare: leadData.tip_asigurare,
      mesaj: leadData.mesaj,
      data: new Date().toLocaleString("ro-RO"),
    })

    return {
      success: true,
      message: "Mulțumim! Te vom contacta în cel mai scurt timp. (Lead-ul a fost înregistrat cu succes)",
      data: newLead,
    }
  } catch (error) {
    console.error("Eroare:", error)
    return {
      success: false,
      error: "A apărut o eroare. Te rugăm să suni direct la 0726 171 050.",
    }
  }
}

export async function updateLeadStatus(leadId: string, status: string) {
  try {
    // Update în memoria temporară
    const leadIndex = tempLeads.findIndex((lead) => lead.id === leadId)
    if (leadIndex !== -1) {
      tempLeads[leadIndex].status = status
      console.log("📝 Status actualizat:", tempLeads[leadIndex])
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: "Eroare la actualizarea statusului" }
  }
}

// Funcție pentru a obține lead-urile (pentru admin)
export async function getLeads() {
  return tempLeads
}

// Funcție pentru statistici
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

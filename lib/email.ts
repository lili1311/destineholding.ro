// Simulare pentru când Resend nu este configurat
export async function sendLeadNotification(lead: {
  nume: string
  prenume: string
  email: string
  telefon: string
  tip_asigurare: string
  mesaj: string
}) {
  // Doar log - nu trimite email real
  console.log("📧 LEAD NOU PRIMIT:", {
    nume: `${lead.nume} ${lead.prenume}`,
    email: lead.email,
    telefon: lead.telefon,
    tip_asigurare: lead.tip_asigurare,
    mesaj: lead.mesaj,
    data: new Date().toLocaleString("ro-RO"),
  })

  return {
    success: true,
    message: "Lead înregistrat cu succes",
  }
}

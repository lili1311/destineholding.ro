// Simulare pentru când Resend nu este configurat
export async function sendLeadNotification(lead: {
  nume: string
  prenume: string
  email: string
  telefon: string
  tip_asigurare: string
  mesaj: string
}) {
  // Simulare email - nu se blochează niciodată
  console.log("📧 SIMULARE EMAIL - Lead nou primit:", {
    nume: `${lead.nume} ${lead.prenume}`,
    email: lead.email,
    telefon: lead.telefon,
    tip_asigurare: lead.tip_asigurare,
    mesaj: lead.mesaj,
    data: new Date().toLocaleString("ro-RO"),
  })

  return {
    success: true,
    message: "Email simulat - configurează RESEND_API_KEY pentru email real",
  }

  // Verifică dacă Resend este configurat
  // if (!process.env.RESEND_API_KEY) {
  //   console.log("📧 SIMULARE EMAIL - Lead nou primit:", {
  //     nume: `${lead.nume} ${lead.prenume}`,
  //     email: lead.email,
  //     telefon: lead.telefon,
  //     tip_asigurare: lead.tip_asigurare,
  //     mesaj: lead.mesaj,
  //     data: new Date().toLocaleString("ro-RO"),
  //   })

  //   return {
  //     success: true,
  //     message: "Email simulat (configurează RESEND_API_KEY pentru email real)",
  //   }
  // }

  // try {
  //   // Importă Resend doar dacă este configurat
  //   const { Resend } = await import("resend")
  //   const resend = new Resend(process.env.RESEND_API_KEY)

  //   const { data, error } = await resend.emails.send({
  //     from: "Destine Holding <noreply@destineholding.ro>",
  //     to: ["asigurariletaleofice6@gmail.com"], // Email-ul corect actualizat
  //     subject: `🔥 Lead Nou: ${lead.nume} ${lead.prenume} - ${lead.tip_asigurare}`,
  //     html: `
  //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  //         <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
  //           <h1 style="margin: 0; font-size: 24px;">🎯 Lead Nou de pe Site!</h1>
  //         </div>

  //         <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0;">
  //           <h2 style="color: #1e3a8a; margin-top: 0;">Informații Client:</h2>

  //           <div style="background: white; padding: 15px; border-radius: 6px; margin: 10px 0;">
  //             <p><strong>👤 Nume:</strong> ${lead.nume} ${lead.prenume}</p>
  //             <p><strong>📧 Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
  //             <p><strong>📱 Telefon:</strong> <a href="tel:${lead.telefon}">${lead.telefon}</a></p>
  //             <p><strong>🛡️ Tip Asigurare:</strong> ${lead.tip_asigurare}</p>
  //           </div>

  //           ${
  //             lead.mesaj
  //               ? `
  //             <div style="background: white; padding: 15px; border-radius: 6px; margin: 10px 0;">
  //               <p><strong>💬 Mesaj:</strong></p>
  //               <p style="background: #f1f5f9; padding: 10px; border-radius: 4px; font-style: italic;">
  //                 "${lead.mesaj}"
  //               </p>
  //             </div>
  //           `
  //               : ""
  //           }

  //           <div style="text-align: center; margin: 20px 0;">
  //             <a href="tel:${lead.telefon}" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">
  //               📞 Sună Acum
  //             </a>
  //             <a href="mailto:${lead.email}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">
  //               ✉️ Trimite Email
  //             </a>
  //           </div>
  //         </div>

  //         <div style="background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
  //           <p>Lead generat de pe site-ul Destine Holding</p>
  //           <p>Data: ${new Date().toLocaleString("ro-RO")}</p>
  //         </div>
  //       </div>
  //     `,
  //   })

  //   if (error) {
  //     console.error("Eroare trimitere email:", error)
  //     return { success: false, error }
  //   }

  //   return { success: true, data }
  // } catch (error) {
  //   console.error("Eroare trimitere email:", error)
  //   return { success: false, error }
  // }
}

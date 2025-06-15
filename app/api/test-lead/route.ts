import { type NextRequest, NextResponse } from "next/server"
import { submitLead } from "@/app/actions/lead-actions"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Adaugă mesaj de test
    formData.set("mesaj", "Test lead din pagina de diagnosticare")

    const result = await submitLead(formData)

    return NextResponse.json({
      status: result.success ? "success" : "error",
      result,
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Eroare la procesarea formularului",
      error: error instanceof Error ? error.message : "Eroare necunoscută",
    })
  }
}

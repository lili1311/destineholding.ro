import { NextResponse } from "next/server"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export async function GET() {
  try {
    // Verifică variabilele de mediu
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      isSupabaseConfigured,
    }

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({
        status: "error",
        message: "Supabase nu este configurat",
        envCheck,
      })
    }

    // Testează conexiunea la Supabase
    const { data, error } = await supabase.from("leads").select("count(*)").limit(1)

    if (error) {
      return NextResponse.json({
        status: "error",
        message: "Eroare conexiune Supabase",
        error: error.message,
        envCheck,
      })
    }

    return NextResponse.json({
      status: "success",
      message: "Toate configurările sunt OK!",
      envCheck,
      supabaseTest: "Conexiune reușită",
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Eroare generală",
      error: error instanceof Error ? error.message : "Eroare necunoscută",
    })
  }
}

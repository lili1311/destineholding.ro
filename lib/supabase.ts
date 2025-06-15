import { createClient } from "@supabase/supabase-js"

// Verifică dacă variabilele de mediu sunt configurate
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Creează client doar dacă variabilele sunt configurate
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

export type Lead = {
  id?: string
  nume: string
  prenume: string
  email: string
  telefon: string
  tip_asigurare: string
  mesaj: string
  status: "nou" | "contactat" | "vandut" | "refuzat"
  created_at?: string
}

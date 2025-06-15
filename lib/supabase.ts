// Versiune simplificată fără dependențe externe
export const supabase = null
export const isSupabaseConfigured = false

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

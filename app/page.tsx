"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Users, Clock, Award, Phone, Mail, MapPin, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function InsuranceLandingPage() {
  const [showCallPopup, setShowCallPopup] = useState(false)
  const [formState, setFormState] = useState<{
    loading: boolean
    success: boolean
    error: string | null
  }>({
    loading: false,
    success: false,
    error: null,
  })

  const handleCallClick = () => {
    setShowCallPopup(true)
  }

  const confirmCall = () => {
    window.location.href = "tel:0726171050"
    setShowCallPopup(false)
  }

  const cancelCall = () => {
    setShowCallPopup(false)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState({ loading: true, success: false, error: null })

    try {
      const formData = new FormData(e.currentTarget)
      const leadData = {
        nume: formData.get("nume") as string,
        prenume: formData.get("prenume") as string,
        email: formData.get("email") as string,
        telefon: formData.get("telefon") as string,
        tip_asigurare: formData.get("serviciu") as string,
        mesaj: formData.get("mesaj") as string,
      }

      // Validare
      if (!leadData.nume || !leadData.prenume || !leadData.email || !leadData.telefon) {
        throw new Error("Toate câmpurile obligatorii trebuie completate")
      }

      // Simulare trimitere (2 secunde)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Log pentru debugging
      console.log("📧 LEAD NOU PRIMIT:", {
        ...leadData,
        data: new Date().toLocaleString("ro-RO"),
      })

      // Salvare în localStorage pentru persistență
      const existingLeads = JSON.parse(localStorage.getItem("destine-leads") || "[]")
      const newLead = {
        ...leadData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        status: "nou",
      }
      existingLeads.unshift(newLead)
      localStorage.setItem("destine-leads", JSON.stringify(existingLeads.slice(0, 100)))

      setFormState({
        loading: false,
        success: true,
        error: null,
      })

      // Reset form
      ;(e.target as HTMLFormElement).reset()

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, success: false }))
      }, 5000)
    } catch (error) {
      setFormState({
        loading: false,
        success: false,
        error: error instanceof Error ? error.message : "A apărut o eroare. Te rugăm să suni direct la 0726 171 050.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <span className="text-2xl font-bold">Destine Holding</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#servicii" className="hover:text-blue-200">
              Servicii
            </a>
            <a href="#despre" className="hover:text-blue-200">
              Despre Noi
            </a>
            <a href="#contact" className="hover:text-blue-200">
              Contact
            </a>
          </nav>
          <Button
            onClick={handleCallClick}
            variant="secondary"
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Sună Acum
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Protejează-ți Viitorul cu Destine Holding</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Suntem parteneri Destine și oferim soluții complete de asigurare pentru tine și familia ta. Peste 15 ani de
            experiență în protejarea celor mai importante lucruri din viața ta.
          </p>
          <div className="mb-8">
            <img
              src="/images/asigurari-pumn.jpg"
              alt="Servicii complete de asigurare - Destine Holding"
              className="mx-auto max-w-md w-full h-auto"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleCallClick}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Sună Acum: 0726 171 050
            </Button>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              Calculează Prima
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
            >
              Află Mai Multe
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">50,000+</div>
              <div className="text-gray-600">Clienți Mulțumiți</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">15+</div>
              <div className="text-gray-600">Ani de Experiență</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">24/7</div>
              <div className="text-gray-600">Suport Clienți</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">99.8%</div>
              <div className="text-gray-600">Rata de Satisfacție</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicii" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Serviciile Noastre de Asigurare</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferim o gamă completă de produse de asigurare adaptate nevoilor tale specifice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Asigurare Auto</CardTitle>
                <CardDescription>
                  Protecție completă pentru vehiculul tău cu cele mai competitive tarife
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    RCA obligatoriu
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    CASCO voluntar
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Asistență rutieră 24/7
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Asigurare de Sănătate</CardTitle>
                <CardDescription>Acces la servicii medicale de calitate pentru tine și familia ta</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Consultații medicale
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Investigații și analize
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Intervenții chirurgicale
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Asigurare de Viață</CardTitle>
                <CardDescription>Securitate financiară pentru cei dragi în orice situație</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Protecție în caz de deces
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Invaliditate permanentă
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Boli grave
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Asigurare Locuință</CardTitle>
                <CardDescription>Protejează-ți casa și bunurile împotriva riscurilor neprevăzute</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Incendiu și explozie
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Fenomene naturale
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Furt și vandalism
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Asigurare Călătorii</CardTitle>
                <CardDescription>Călătorește liniștit cu protecție completă în străinătate</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Cheltuieli medicale
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Anulare călătorie
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Pierdere bagaje
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Asigurări Business</CardTitle>
                <CardDescription>Soluții personalizate pentru protejarea afacerii tale</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Răspundere civilă
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Proprietate comercială
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Întrerupere activitate
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="despre" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">De Ce Să Ne Alegi Pe Noi?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ca parteneri Destine, suntem alături de tine în protejarea celor mai importante aspecte ale vieții tale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Siguranță Garantată</h3>
              <p className="text-gray-600">Companie autorizată ASF cu rating de siguranță AAA</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Procesare Rapidă</h3>
              <p className="text-gray-600">Despăgubiri procesate în maximum 30 de zile</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suport Expert</h3>
              <p className="text-gray-600">Echipă de specialiști cu experiență vastă</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prețuri Competitive</h3>
              <p className="text-gray-600">Cele mai bune oferte de pe piață</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactează-ne Astăzi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suntem aici să te ajutăm să găsești soluția de asigurare perfectă pentru nevoile tale
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Solicită o Ofertă Personalizată</CardTitle>
                  <CardDescription>Completează formularul și te vom contacta în cel mai scurt timp</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nume">Nume *</Label>
                        <Input id="nume" name="nume" placeholder="Numele tău" required />
                      </div>
                      <div>
                        <Label htmlFor="prenume">Prenume *</Label>
                        <Input id="prenume" name="prenume" placeholder="Prenumele tău" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="email@exemplu.com" required />
                    </div>
                    <div>
                      <Label htmlFor="telefon">Telefon *</Label>
                      <Input id="telefon" name="telefon" placeholder="+40 123 456 789" required />
                    </div>
                    <div>
                      <Label htmlFor="serviciu">Tip Asigurare *</Label>
                      <select name="serviciu" className="w-full p-2 border border-gray-300 rounded-md" required>
                        <option value="">Selectează tipul de asigurare</option>
                        <option value="Asigurare Auto">Asigurare Auto</option>
                        <option value="Asigurare de Sănătate">Asigurare de Sănătate</option>
                        <option value="Asigurare de Viață">Asigurare de Viață</option>
                        <option value="Asigurare Locuință">Asigurare Locuință</option>
                        <option value="Asigurare Călătorii">Asigurare Călătorii</option>
                        <option value="Asigurări Business">Asigurări Business</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="mesaj">Mesaj</Label>
                      <Textarea id="mesaj" name="mesaj" placeholder="Detalii suplimentare..." />
                    </div>

                    {formState.error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {formState.error}
                      </div>
                    )}

                    {formState.success && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                        ✅ Mulțumim! Solicitarea ta a fost înregistrată cu succes. Te vom contacta în cel mai scurt timp
                        la numărul și email-ul furnizate.
                      </div>
                    )}

                    <Button type="submit" disabled={formState.loading} className="w-full bg-blue-600 hover:bg-blue-700">
                      {formState.loading ? "Se trimite..." : "Trimite Solicitarea"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Informații de Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Telefon</div>
                      <button
                        onClick={handleCallClick}
                        className="text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        0726 171 050
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-gray-600">asigurariletaleofice6@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">Adresă</div>
                      <div className="text-gray-600">Str. Victoriei nr. 123, București</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6">Program de Lucru</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Luni - Vineri:</span>
                    <span>08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sâmbătă:</span>
                    <span>09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duminică:</span>
                    <span>Închis</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Urgențe 24/7</h4>
                <p className="text-blue-800 mb-2">Pentru situații de urgență, suntem disponibili non-stop:</p>
                <button
                  onClick={handleCallClick}
                  className="text-xl font-bold text-blue-900 hover:text-blue-700 underline"
                >
                  0726 171 050
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8" />
                <span className="text-2xl font-bold">Destine Holding</span>
              </div>
              <p className="text-gray-400">
                Parteneri Destine - soluții complete de asigurare pentru toate nevoile tale.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicii</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Asigurare Auto</li>
                <li>Asigurare Sănătate</li>
                <li>Asigurare Viață</li>
                <li>Asigurare Locuință</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compania</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Despre Noi</li>
                <li>Cariere</li>
                <li>Presa</li>
                <li>Parteneri</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suport</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centru de Ajutor</li>
                <li>Raportează o Daună</li>
                <li>Termeni și Condiții</li>
                <li>Politica de Confidențialitate</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Destine Holding. Toate drepturile rezervate. | Autorizat ASF</p>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleCallClick}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>

      {/* Call Confirmation Popup */}
      {showCallPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Confirmare Apel</h3>
                <button onClick={cancelCall} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-2">Dorești să suni la:</p>
                <p className="text-2xl font-bold text-blue-900">0726 171 050</p>
                <p className="text-sm text-gray-500 mt-2">Destine Holding - Asigurări</p>
              </div>

              <div className="flex gap-3">
                <Button onClick={cancelCall} variant="outline" className="flex-1">
                  Anulează
                </Button>
                <Button onClick={confirmCall} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Sună Acum
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

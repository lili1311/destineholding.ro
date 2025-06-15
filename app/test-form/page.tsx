"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestFormPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Eroare de conexiune", details: error })
    }
    setLoading(false)
  }

  const testForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const response = await fetch("/api/test-lead", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Eroare la trimitere", details: error })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Test Conexiune */}
        <Card>
          <CardHeader>
            <CardTitle>🔧 Test Configurare</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={testConnection} disabled={loading}>
              {loading ? "Testez..." : "Testează Conexiunea"}
            </Button>
          </CardContent>
        </Card>

        {/* Test Formular */}
        <Card>
          <CardHeader>
            <CardTitle>📝 Test Formular</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={testForm} className="space-y-4">
              <div>
                <Label htmlFor="nume">Nume</Label>
                <Input id="nume" name="nume" defaultValue="Test" required />
              </div>
              <div>
                <Label htmlFor="prenume">Prenume</Label>
                <Input id="prenume" name="prenume" defaultValue="User" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue="test@example.com" required />
              </div>
              <div>
                <Label htmlFor="telefon">Telefon</Label>
                <Input id="telefon" name="telefon" defaultValue="0123456789" required />
              </div>
              <div>
                <Label htmlFor="serviciu">Serviciu</Label>
                <select name="serviciu" className="w-full p-2 border rounded" required>
                  <option value="Asigurare Auto">Asigurare Auto</option>
                </select>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Testez..." : "Testează Formularul"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Rezultate */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>📊 Rezultate Test</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

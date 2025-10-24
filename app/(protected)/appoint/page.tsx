"use client"

import type React from "react"

import { useState } from "react"
<<<<<<< HEAD
=======
import { useRouter } from "next/navigation"
>>>>>>> 3ccef14 (update view profile)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
<<<<<<< HEAD
import { UserPlus, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AppointPage() {
=======
import { UserPlus, CheckCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AppointPage() {
  const router = useRouter()
>>>>>>> 3ccef14 (update view profile)
  const [walletAddress, setWalletAddress] = useState("")
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [region, setRegion] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle appointment submission
    console.log("Appointing ambassador:", { walletAddress, name, country, region })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setWalletAddress("")
      setName("")
      setCountry("")
      setRegion("")
    }, 3000)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
<<<<<<< HEAD
=======
        <Button variant="ghost" onClick={() => router.back()} className="w-fit -ml-2 mb-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
>>>>>>> 3ccef14 (update view profile)
        <h1 className="text-3xl font-bold text-balance">Appoint Ambassador</h1>
        <p className="text-muted-foreground">Nominate a new member to join the Qubic ambassador program</p>
      </div>

      {submitted && (
        <Alert className="bg-emerald-500/10 border-emerald-500/20">
          <CheckCircle className="h-4 w-4 text-emerald-500" />
          <AlertDescription className="text-emerald-500">
            Ambassador appointment submitted successfully! They will receive a notification.
          </AlertDescription>
        </Alert>
      )}

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Ambassador Details</CardTitle>
          <CardDescription>Enter the information for the new ambassador candidate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet Address *</Label>
              <Input
                id="wallet"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="QUBIC..."
                required
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">The Qubic wallet address of the candidate</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United States"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Select value={region} onValueChange={setRegion} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={!walletAddress || !name || !country || !region}>
              <UserPlus className="h-4 w-4 mr-2" />
              Appoint Ambassador
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
          <CardDescription>Criteria for appointing a new ambassador</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
              <span>Candidate must have an active Qubic wallet</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
              <span>Must demonstrate knowledge of Qubic technology</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
              <span>Should be active in the Qubic community</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
              <span>Willing to promote and support the Qubic ecosystem</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

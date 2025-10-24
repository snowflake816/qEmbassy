"use client"

import type React from "react"
<<<<<<< HEAD

import { useState } from "react"
import { Upload, Lock, Loader2 } from "lucide-react"
=======
import { useState } from "react"
import { Loader2, KeyRound, ClipboardPaste } from "lucide-react"
>>>>>>> 3ccef14 (update view profile)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
<<<<<<< HEAD
import { authenticateVault, saveAuth } from "@/lib/auth"
=======
import { saveAuth } from "@/lib/auth"
>>>>>>> 3ccef14 (update view profile)
import { useRouter } from "next/navigation"

export function VaultLogin() {
  const router = useRouter()
<<<<<<< HEAD
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.name.endsWith(".qubic-vault")) {
      setFile(selectedFile)
      setError("")
    } else {
      setError("Please select a valid .qubic-vault file")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Please upload a vault file")
      return
    }

    if (!password) {
      setError("Please enter your password")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await authenticateVault(file, password)

      if (result.success && result.address) {
        // Save auth to localStorage
        saveAuth(result.address, "mock-public-key")

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError(result.error || "Authentication failed")
      }
    } catch (err) {
      setError("An error occurred during authentication")
=======
  const [publicKey, setPublicKey] = useState("")
  const [nonce, setNonce] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<"input" | "verify">("input")

  // Step 1: Submit public key to get nonce
  const handleGetNonce = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!publicKey.trim()) {
      setError("Please enter your Qubic wallet public key")
      return
    }

    try {
      setIsLoading(true)
      setError("")

      const res = await fetch(`/api/auth/challenge?pubkey=${publicKey}`)
      const data = await res.json()

      if (!data.nonce) throw new Error("Failed to get challenge nonce")

      setNonce(data.nonce)
      setStep("verify")
    } catch (err: any) {
      setError(err.message || "Error getting nonce from server")
    } finally {
      setIsLoading(false)
    }
  }

  // Step 2: Verify signature
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const signature = (e.currentTarget.elements.namedItem("signature") as HTMLInputElement)?.value.trim()
    if (!signature) {
      setError("Please enter the signed message (signature)")
      return
    }

    try {
      setIsLoading(true)
      setError("")

      const res = await fetch(`/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey, signature })
      })

      const data = await res.json()
      if (!res.ok || !data.token) throw new Error(data.error || "Verification failed")

      saveAuth(publicKey, data.token)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
>>>>>>> 3ccef14 (update view profile)
    } finally {
      setIsLoading(false)
    }
  }

<<<<<<< HEAD
=======
  // 📋 Paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (!text) throw new Error("Clipboard is empty")
      setPublicKey(text.trim())
      setError("")
    } catch (err: any) {
      setError("Failed to read clipboard content")
    }
  }

>>>>>>> 3ccef14 (update view profile)
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">qEmbassy</h1>
          <p className="text-muted-foreground">Qubic Ambassador Management</p>
        </div>

        <Card className="glass-card border-primary/20">
          <CardHeader>
<<<<<<< HEAD
            <CardTitle className="text-2xl">Vault Login</CardTitle>
            <CardDescription>
              Upload your .qubic-vault file and enter your password to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vault-file">Vault File</Label>
                <div className="relative">
                  <Input
                    id="vault-file"
                    type="file"
                    accept=".qubic-vault"
                    onChange={handleFileChange}
                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <Upload className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                {file && (
                  <p className="text-sm text-primary flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {file.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your vault password"
                    className="pr-10"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || !file || !password}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Your vault file is processed locally and never leaves your device
=======
            <CardTitle className="text-2xl">Wallet Login</CardTitle>
            <CardDescription>
              {step === "input"
                ? "Enter your Qubic wallet public key to start authentication"
                : "Sign the provided nonce and paste the signature below"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === "input" ? (
              <form onSubmit={handleGetNonce} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="publicKey">Public Key</Label>
                  <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="publicKey"
                        type="text"
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                        placeholder="Enter or paste your Qubic public key"
                        className="pr-10 font-mono text-xs"
                      />
                      <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={handlePaste}
                      title="Paste from clipboard"
                    >
                      <ClipboardPaste className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Nonce...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <Label>Nonce (Sign this message in your Qubic wallet)</Label>
                  <Input readOnly value={nonce || ""} className="font-mono text-xs" />
                </div>

                <div>
                  <Label htmlFor="signature">Signed Message (Signature)</Label>
                  <Input
                    id="signature"
                    type="text"
                    placeholder="Paste your signed message here"
                    className="font-mono text-xs"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </Button>

                <div className="mt-4 text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs text-muted-foreground"
                    onClick={() => setStep("input")}
                  >
                    ← Go Back
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Authentication uses your Qubic wallet’s public key and signature — your keys never leave your device
>>>>>>> 3ccef14 (update view profile)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

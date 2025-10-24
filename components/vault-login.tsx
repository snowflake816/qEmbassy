"use client"

import type React from "react"
import { useState } from "react"
import { Loader2, KeyRound, ClipboardPaste } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { saveAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function VaultLogin() {
  const router = useRouter()
  const { toast } = useToast()
  const [publicKey, setPublicKey] = useState("")
  // const [nonce, setNonce] = useState<string | null>(null)
  // const [step, setStep] = useState<"input" | "verify">("input")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!publicKey.trim()) {
      setError("Please enter your Qubic wallet public key")
      return
    }

    // Validate 60-character public key
    if (publicKey.trim().length !== 60) {
      setError("Qubic wallet public key must be exactly 60 characters")
      return
    }

    try {
      setIsLoading(true)
      setError("")

      // Simulate a brief loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      saveAuth(publicKey, publicKey) // Using publicKey as token temporarily

      // Show success notification
      toast({
        title: "Success",
        description: "You have successfully registered",
        variant: "default",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  /* 
  // ============================================
  // BACKEND INTEGRATION - COMMENTED OUT
  // ============================================
  // This is the original two-step authentication flow
  // that will be used when backend is ready:
  
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
      
      toast({
        title: "Success",
        description: "You have successfully registered",
        variant: "default",
      })
      
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }
  */

  // 📋 Paste from clipboard
  const handlePaste = async () => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        setError("Clipboard access is not available in this browser")
        return
      }

      const text = await navigator.clipboard.readText()

      if (!text || text.trim().length === 0) {
        setError("Clipboard is empty")
        return
      }

      setPublicKey(text.trim())
      setError("")

      // Optional: Show success feedback
      toast({
        title: "Pasted",
        description: "Public key pasted from clipboard",
        variant: "default",
      })
    } catch (err: any) {
      console.error("[v0] Clipboard paste error:", err)
      setError("Failed to read clipboard. Please paste manually or check browser permissions.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">qEmbassy</h1>
          <p className="text-muted-foreground">Qubic Ambassador Management</p>
        </div>

        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Wallet Login</CardTitle>
            <CardDescription>Enter your 60-digit Qubic wallet public key to connect</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="publicKey">Public Key (60 characters)</Label>
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="publicKey"
                      type="text"
                      value={publicKey}
                      onChange={(e) => setPublicKey(e.target.value)}
                      placeholder="Enter or paste your Qubic public key"
                      className="pr-10 font-mono text-xs"
                      maxLength={60}
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
                <p className="text-xs text-muted-foreground">{publicKey.length}/60 characters</p>
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
                    Connecting...
                  </>
                ) : (
                  "Connect"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Authentication uses your Qubic wallet's public key — your keys never leave your device
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

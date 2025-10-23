"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authenticateVault, saveAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function VaultLogin() {
  const router = useRouter()
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
    } finally {
      setIsLoading(false)
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
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

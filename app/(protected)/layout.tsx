"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { getCurrentUser, getUserProfile, type UserProfile } from "@/lib/auth"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const user = getCurrentUser()

      if (!user) {
        router.push("/")
        return
      }

      // Fetch user profile
      const userProfile = await getUserProfile(user.address)
      setProfile(userProfile)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-primary font-bold text-lg">Q</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader userAddress={profile?.address} />
      <div className="flex flex-1">
        <AppSidebar userRole={profile?.role} className="hidden md:flex" />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

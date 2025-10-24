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
<<<<<<< HEAD
=======
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
>>>>>>> 3ccef14 (update view profile)

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
<<<<<<< HEAD
      <AppHeader userAddress={profile?.address} />
      <div className="flex flex-1">
        <AppSidebar userRole={profile?.role} className="hidden md:flex" />
=======
      <AppHeader userAddress={profile?.address} onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex flex-1 relative">
        {/* Desktop sidebar - hidden on mobile */}
        <AppSidebar userRole={profile?.role} className="hidden md:flex" />

        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            {/* Mobile sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 md:hidden">
              <AppSidebar userRole={profile?.role} onNavigate={() => setIsMobileMenuOpen(false)} />
            </div>
          </>
        )}

>>>>>>> 3ccef14 (update view profile)
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

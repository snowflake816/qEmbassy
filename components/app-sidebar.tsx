"use client"

import type React from "react"
import { Home, Users, UserCog, UserPlus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: string[]
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Ambassadors", href: "/ambassadors", icon: Users },
  { title: "My Team", href: "/team", icon: UserCog, roles: ["team_lead", "admin"] },
  { title: "Appoint Ambassador", href: "/appoint", icon: UserPlus, roles: ["team_lead", "admin"] },
]

interface AppSidebarProps {
  userRole?: string
  className?: string
}

export function AppSidebar({ userRole = "ambassador", className }: AppSidebarProps) {
  const pathname = usePathname()

  // const filteredNavItems = navItems.filter(
  //   (item) => !item.roles || item.roles.includes(userRole)
  // )

  return (
    <aside className={cn("w-64 border-r border-border/40 glass", className)}>
      <nav className="w-full flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

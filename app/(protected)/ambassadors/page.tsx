"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, MapPin, Calendar, Award } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
<<<<<<< HEAD
=======
import Link from "next/link"
>>>>>>> 3ccef14 (update view profile)

interface Ambassador {
  id: string
  name: string
  address: string
  country: string
  region: string
  status: "active" | "inactive" | "pending"
  role: "ambassador" | "team_lead" | "admin"
  nftMinted: boolean
  nftId?: string
  joinedDate: string
  teamSize?: number
}

// Mock data
const mockAmbassadors: Ambassador[] = [
  {
    id: "1",
    name: "Alex Thompson",
    address: "QUBICABC123XYZ",
    country: "United States",
    region: "North America",
    status: "active",
    role: "team_lead",
    nftMinted: true,
    nftId: "NFT-001",
    joinedDate: "2024-01-15",
    teamSize: 12,
  },
  {
    id: "2",
    name: "Yuki Tanaka",
    address: "QUBICDEF456UVW",
    country: "Japan",
    region: "Asia",
    status: "active",
    role: "ambassador",
    nftMinted: true,
    nftId: "NFT-002",
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Sofia Martinez",
    address: "QUBICGHI789RST",
    country: "Spain",
    region: "Europe",
    status: "active",
    role: "team_lead",
    nftMinted: true,
    nftId: "NFT-003",
    joinedDate: "2024-01-28",
    teamSize: 8,
  },
  {
    id: "4",
    name: "James Wilson",
    address: "QUBICJKL012OPQ",
    country: "United Kingdom",
    region: "Europe",
    status: "active",
    role: "ambassador",
    nftMinted: false,
    joinedDate: "2024-03-10",
  },
  {
    id: "5",
    name: "Priya Sharma",
    address: "QUBICMNO345LMN",
    country: "India",
    region: "Asia",
    status: "active",
    role: "ambassador",
    nftMinted: true,
    nftId: "NFT-005",
    joinedDate: "2024-02-05",
  },
  {
    id: "6",
    name: "Marcus Johnson",
    address: "QUBICPQR678IJK",
    country: "Canada",
    region: "North America",
    status: "pending",
    role: "ambassador",
    nftMinted: false,
    joinedDate: "2024-10-15",
  },
  {
    id: "7",
    name: "Elena Rodriguez",
    address: "QUBICSTU901GHI",
    country: "Argentina",
    region: "South America",
    status: "active",
    role: "team_lead",
    nftMinted: true,
    nftId: "NFT-007",
    joinedDate: "2024-01-20",
    teamSize: 15,
  },
  {
    id: "8",
    name: "David Kim",
    address: "QUBICVWX234DEF",
    country: "South Korea",
    region: "Asia",
    status: "active",
    role: "ambassador",
    nftMinted: true,
    nftId: "NFT-008",
    joinedDate: "2024-03-01",
  },
]

export default function AmbassadorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [regionFilter, setRegionFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const filteredAmbassadors = mockAmbassadors.filter((ambassador) => {
    const matchesSearch =
      ambassador.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ambassador.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ambassador.country.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ambassador.status === statusFilter
    const matchesRegion = regionFilter === "all" || ambassador.region === regionFilter
    const matchesRole = roleFilter === "all" || ambassador.role === roleFilter

    return matchesSearch && matchesStatus && matchesRegion && matchesRole
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Ambassadors</h1>
        <p className="text-muted-foreground">Browse and manage the Qubic ambassador network</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, address, or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="ambassador">Ambassador</SelectItem>
                  <SelectItem value="team_lead">Team Lead</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              {(searchQuery || statusFilter !== "all" || regionFilter !== "all" || roleFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setRegionFilter("all")
                    setRoleFilter("all")
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAmbassadors.length} of {mockAmbassadors.length} ambassadors
        </p>
      </div>

      {/* Ambassador Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAmbassadors.map((ambassador) => (
          <Card key={ambassador.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-sm font-semibold">
                      {ambassador.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{ambassador.name}</CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">{ambassador.address.slice(0, 12)}...</p>
                  </div>
                </div>
                <Badge
                  variant={
                    ambassador.status === "active"
                      ? "default"
                      : ambassador.status === "pending"
                        ? "secondary"
                        : "outline"
                  }
                  className={
                    ambassador.status === "active"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : ambassador.status === "pending"
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        : ""
                  }
                >
                  {ambassador.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{ambassador.country}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{ambassador.region}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Joined{" "}
                  {new Date(ambassador.joinedDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {ambassador.role === "team_lead" ? "Team Lead" : ambassador.role === "admin" ? "Admin" : "Ambassador"}
                </Badge>
                {ambassador.nftMinted && (
                  <Badge variant="outline" className="text-xs bg-violet-500/10 text-violet-500 border-violet-500/20">
                    <Award className="h-3 w-3 mr-1" />
                    NFT
                  </Badge>
                )}
                {ambassador.teamSize && (
                  <Badge variant="outline" className="text-xs">
                    Team: {ambassador.teamSize}
                  </Badge>
                )}
              </div>

<<<<<<< HEAD
              <Button variant="outline" className="w-full mt-2 bg-transparent" size="sm">
                View Profile
              </Button>
=======
              <Link href={`/ambassadors/${encodeURIComponent(ambassador.name)}`}>
                <Button variant="outline" className="w-full mt-2 bg-transparent" size="sm">
                  View Profile
                </Button>
              </Link>
>>>>>>> 3ccef14 (update view profile)
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAmbassadors.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No ambassadors found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

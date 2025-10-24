"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, MapPin, Calendar, ExternalLink, Copy, Check, ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

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
  teamId?: string
}

// Mock data - same as ambassadors page
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

export default function AmbassadorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [ambassador, setAmbassador] = useState<Ambassador | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copiedAddress, setCopiedAddress] = useState(false)

  useEffect(() => {
    const loadAmbassador = async () => {
      const name = decodeURIComponent(params.name as string)
      const found = mockAmbassadors.find((amb) => amb.name === name)
      setAmbassador(found || null)
      setIsLoading(false)
    }
    loadAmbassador()
  }, [params.name])

  const handleCopyAddress = () => {
    if (ambassador?.address) {
      navigator.clipboard.writeText(ambassador.address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-primary font-bold text-lg">Q</span>
          </div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!ambassador) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Ambassador not found</p>
            <Button onClick={handleBack} className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={handleBack} className="w-fit">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">{ambassador.name}</h1>
        <p className="text-muted-foreground">Ambassador Profile</p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-bold">
                {ambassador.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{ambassador.name}</h2>
                    <Badge
                      variant={ambassador.status === "active" ? "default" : "secondary"}
                      className={
                        ambassador.status === "active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""
                      }
                    >
                      {ambassador.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono">{ambassador.address}</span>
                    <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="h-6 w-6 p-0">
                      {copiedAddress ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {ambassador.country}, {ambassador.region}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Joined{" "}
                    {new Date(ambassador.joinedDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {ambassador.role === "team_lead" ? "Team Lead" : ambassador.role === "admin" ? "Admin" : "Ambassador"}
                </Badge>
                {ambassador.nftMinted && (
                  <Badge variant="outline" className="text-xs bg-violet-500/10 text-violet-500 border-violet-500/20">
                    <Award className="h-3 w-3 mr-1" />
                    NFT Holder
                  </Badge>
                )}
                {ambassador.teamId && (
                  <Badge variant="outline" className="text-xs">
                    Team Member
                  </Badge>
                )}
                {ambassador.teamSize && (
                  <Badge variant="outline" className="text-xs">
                    Team: {ambassador.teamSize} members
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nft">NFT</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Ambassador details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Full Name</div>
                  <div className="text-sm">{ambassador.name}</div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Wallet Address</div>
                  <div className="text-sm font-mono break-all">{ambassador.address}</div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Location</div>
                  <div className="text-sm">
                    {ambassador.country}, {ambassador.region}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Role</div>
                  <div className="text-sm capitalize">{ambassador.role.replace("_", " ")}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Activity Score</span>
                  <span className="text-sm font-mono font-semibold">{Math.floor(Math.random() * 10000) + 5000}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Global Rank</span>
                  <span className="text-sm font-mono font-semibold">#{Math.floor(Math.random() * 500) + 50}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Days Active</span>
                  <span className="text-sm font-mono font-semibold">
                    {Math.floor((Date.now() - new Date(ambassador.joinedDate).getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Achievements</span>
                  <span className="text-sm font-mono font-semibold">{Math.floor(Math.random() * 20) + 5}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Latest milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "NFT Minted",
                    description: "Successfully minted ambassador NFT",
                    date: "Oct 10, 2024",
                    icon: Award,
                    color: "violet",
                  },
                  {
                    title: "5K Activity Score",
                    description: "Reached 5,000 activity points",
                    date: "Oct 5, 2024",
                    icon: Award,
                    color: "emerald",
                  },
                  {
                    title: "Profile Completed",
                    description: "Filled out all profile information",
                    date: "Sep 28, 2024",
                    icon: Award,
                    color: "blue",
                  },
                ].map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div
                        className={`h-10 w-10 rounded-lg bg-${achievement.color}-500/10 flex items-center justify-center`}
                      >
                        <Icon className={`h-5 w-5 text-${achievement.color}-500`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nft" className="space-y-4">
          {ambassador.nftMinted ? (
            <Card>
              <CardHeader>
                <CardTitle>Ambassador NFT</CardTitle>
                <CardDescription>Unique Qubic ambassador credential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-64 h-64 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center border">
                    <div className="text-center space-y-2">
                      <Award className="h-16 w-16 mx-auto text-primary" />
                      <p className="font-bold text-lg">Ambassador NFT</p>
                      <p className="text-xs text-muted-foreground font-mono">#{ambassador.nftId}</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">NFT ID</div>
                      <div className="text-sm font-mono">{ambassador.nftId}</div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Owner</div>
                      <div className="text-sm font-mono break-all">{ambassador.address}</div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Minted Date</div>
                      <div className="text-sm">
                        {new Date(ambassador.joinedDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <Separator />
                    <Button variant="outline" className="w-full md:w-auto bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Explorer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No NFT Minted</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  This ambassador has not minted their NFT yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Recent actions and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Updated profile information", date: "2 hours ago" },
                  { action: "Completed milestone: 5K activity score", date: "1 day ago" },
                  { action: "Minted ambassador NFT", date: "5 days ago" },
                  {
                    action: "Joined Qubic ambassador program",
                    date: `${Math.floor((Date.now() - new Date(ambassador.joinedDate).getTime()) / (1000 * 60 * 60 * 24))} days ago`,
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">{activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

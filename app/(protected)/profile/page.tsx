"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, MapPin, Calendar, Edit, ExternalLink, Copy, Check } from "lucide-react"
import { getCurrentUser, getUserProfile, type UserProfile } from "@/lib/auth"
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      const user = getCurrentUser()
      if (user) {
        const userProfile = await getUserProfile(user.address)
        setProfile(userProfile)
      }
      setIsLoading(false)
    }
    loadProfile()
  }, [])

  const handleCopyAddress = () => {
    if (profile?.address) {
      navigator.clipboard.writeText(profile.address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    }
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

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Profile not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance">Profile</h1>
        <p className="text-muted-foreground">Manage your ambassador profile and settings</p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-bold">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <Badge
                      variant={profile.status === "active" ? "default" : "secondary"}
                      className={
                        profile.status === "active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""
                      }
                    >
                      {profile.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono">{profile.address}</span>
                    <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="h-6 w-6 p-0">
                      {copiedAddress ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
                <Button onClick={() => setEditDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {profile.country}, {profile.region}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Joined{" "}
                    {new Date(profile.joinedDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {profile.role === "team_lead" ? "Team Lead" : profile.role === "admin" ? "Admin" : "Ambassador"}
                </Badge>
                {profile.nftMinted && (
                  <Badge variant="outline" className="text-xs bg-violet-500/10 text-violet-500 border-violet-500/20">
                    <Award className="h-3 w-3 mr-1" />
                    NFT Holder
                  </Badge>
                )}
                {profile.teamId && (
                  <Badge variant="outline" className="text-xs">
                    Team Member
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
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your basic ambassador details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Full Name</div>
                  <div className="text-sm">{profile.name}</div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Wallet Address</div>
                  <div className="text-sm font-mono break-all">{profile.address}</div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Location</div>
                  <div className="text-sm">
                    {profile.country}, {profile.region}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Role</div>
                  <div className="text-sm capitalize">{profile.role.replace("_", " ")}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Activity Score</span>
                  <span className="text-sm font-mono font-semibold">8,547</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Global Rank</span>
                  <span className="text-sm font-mono font-semibold">#127</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Days Active</span>
                  <span className="text-sm font-mono font-semibold">
                    {Math.floor((Date.now() - new Date(profile.joinedDate).getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Achievements</span>
                  <span className="text-sm font-mono font-semibold">12</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "NFT Minted",
                    description: "Successfully minted your ambassador NFT",
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
          {profile.nftMinted ? (
            <Card>
              <CardHeader>
                <CardTitle>Ambassador NFT</CardTitle>
                <CardDescription>Your unique Qubic ambassador credential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-64 h-64 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center border">
                    <div className="text-center space-y-2">
                      <Award className="h-16 w-16 mx-auto text-primary" />
                      <p className="font-bold text-lg">Ambassador NFT</p>
                      <p className="text-xs text-muted-foreground font-mono">#{profile.nftId}</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">NFT ID</div>
                      <div className="text-sm font-mono">{profile.nftId}</div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Owner</div>
                      <div className="text-sm font-mono break-all">{profile.address}</div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Minted Date</div>
                      <div className="text-sm">
                        {new Date(profile.joinedDate).toLocaleDateString("en-US", {
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
                <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                  Mint your ambassador NFT to unlock exclusive benefits and showcase your role in the Qubic community.
                </p>
                <Button>Mint NFT</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Your recent actions and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Updated profile information", date: "2 hours ago" },
                  { action: "Completed milestone: 5K activity score", date: "1 day ago" },
                  { action: "Minted ambassador NFT", date: "5 days ago" },
                  { action: "Joined Qubic ambassador program", date: "280 days ago" },
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

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Notifications</h4>
                <p className="text-sm text-muted-foreground">Configure how you receive updates</p>
                <Button variant="outline" size="sm">
                  Manage Notifications
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Privacy</h4>
                <p className="text-sm text-muted-foreground">Control your profile visibility</p>
                <Button variant="outline" size="sm">
                  Privacy Settings
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Security</h4>
                <p className="text-sm text-muted-foreground">Manage your wallet and authentication</p>
                <Button variant="outline" size="sm">
                  Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditProfileDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} profile={profile} />
    </div>
  )
}

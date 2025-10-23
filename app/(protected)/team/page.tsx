"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, Award, UserPlus, MoreVertical, Mail, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TeamPerformanceChart } from "@/components/team/team-performance-chart"
import { InviteMemberDialog } from "@/components/team/invite-member-dialog"

interface TeamMember {
  id: string
  name: string
  address: string
  country: string
  status: "active" | "inactive" | "pending"
  nftMinted: boolean
  joinedDate: string
  activityScore: number
}

// Mock data
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    address: "QUBICAAA111BBB",
    country: "United States",
    status: "active",
    nftMinted: true,
    joinedDate: "2024-02-15",
    activityScore: 9847,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    address: "QUBICBBB222CCC",
    country: "Canada",
    status: "active",
    nftMinted: true,
    joinedDate: "2024-03-20",
    activityScore: 8521,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    address: "QUBICCCC333DDD",
    country: "Mexico",
    status: "active",
    nftMinted: false,
    joinedDate: "2024-04-10",
    activityScore: 7203,
  },
  {
    id: "4",
    name: "David Kim",
    address: "QUBICDDD444EEE",
    country: "United States",
    status: "pending",
    nftMinted: false,
    joinedDate: "2024-10-15",
    activityScore: 1250,
  },
  {
    id: "5",
    name: "Amara Okafor",
    address: "QUBICEEE555FFF",
    country: "Canada",
    status: "active",
    nftMinted: true,
    joinedDate: "2024-05-01",
    activityScore: 6890,
  },
]

export default function TeamPage() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)

  const activeMembers = mockTeamMembers.filter((m) => m.status === "active").length
  const pendingMembers = mockTeamMembers.filter((m) => m.status === "pending").length
  const nftHolders = mockTeamMembers.filter((m) => m.nftMinted).length
  const avgActivityScore = Math.round(
    mockTeamMembers.reduce((sum, m) => sum + m.activityScore, 0) / mockTeamMembers.length,
  )

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">My Team</h1>
          <p className="text-muted-foreground">Manage and track your team's performance</p>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeMembers} active, {pendingMembers} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Activity Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgActivityScore.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+12.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NFT Holders</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nftHolders}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((nftHolders / mockTeamMembers.length) * 100)}% of team
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Rank</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <p className="text-xs text-muted-foreground">Out of 247 teams</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Activity Score</TableHead>
                    <TableHead>NFT</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTeamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {member.address.slice(0, 12)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {member.country}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.status === "active"
                              ? "default"
                              : member.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            member.status === "active"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : member.status === "pending"
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                : ""
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{member.activityScore.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        {member.nftMinted ? (
                          <Badge variant="outline" className="bg-violet-500/10 text-violet-500 border-violet-500/20">
                            <Award className="h-3 w-3 mr-1" />
                            Minted
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not minted</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(member.joinedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Remove from Team</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Track your team's activity and growth over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <TeamPerformanceChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest activity scores this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTeamMembers
                    .sort((a, b) => b.activityScore - a.activityScore)
                    .slice(0, 3)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                          #{index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.country}</p>
                        </div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {member.activityScore.toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Milestones</CardTitle>
                <CardDescription>Recent achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Award className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">10 Team Members</p>
                      <p className="text-xs text-muted-foreground">Reached on Oct 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">50K Activity Score</p>
                      <p className="text-xs text-muted-foreground">Reached on Oct 10, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <Award className="h-4 w-4 text-violet-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">5 NFTs Minted</p>
                      <p className="text-xs text-muted-foreground">Reached on Oct 5, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions from your team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { member: "Sarah Chen", action: "Minted NFT", time: "2 hours ago" },
                  { member: "Marcus Johnson", action: "Completed milestone", time: "5 hours ago" },
                  { member: "Amara Okafor", action: "Updated profile", time: "1 day ago" },
                  { member: "Elena Rodriguez", action: "Joined team", time: "2 days ago" },
                  { member: "David Kim", action: "Pending approval", time: "3 days ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">
                        {activity.member
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.member}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <InviteMemberDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </div>
  )
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    name: "Sarah Chen",
    action: "Minted NFT",
    time: "2 minutes ago",
    status: "success",
  },
  {
    name: "Marcus Johnson",
    action: "Joined Team",
    time: "15 minutes ago",
    status: "info",
  },
  {
    name: "Elena Rodriguez",
    action: "Reached Milestone",
    time: "1 hour ago",
    status: "success",
  },
  {
    name: "David Kim",
    action: "Updated Profile",
    time: "2 hours ago",
    status: "neutral",
  },
  {
    name: "Amara Okafor",
    action: "New Registration",
    time: "3 hours ago",
    status: "info",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs">
              {activity.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-xs text-muted-foreground">{activity.action}</p>
          </div>
          <div className="text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

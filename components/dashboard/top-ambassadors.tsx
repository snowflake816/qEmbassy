import { Badge } from "@/components/ui/badge"

const topAmbassadors = [
  {
    name: "Alex Thompson",
    country: "United States",
    score: 9847,
    rank: 1,
  },
  {
    name: "Yuki Tanaka",
    country: "Japan",
    score: 9521,
    rank: 2,
  },
  {
    name: "Sofia Martinez",
    country: "Spain",
    score: 9203,
    rank: 3,
  },
  {
    name: "James Wilson",
    country: "United Kingdom",
    score: 8956,
    rank: 4,
  },
  {
    name: "Priya Sharma",
    country: "India",
    score: 8734,
    rank: 5,
  },
]

export function TopAmbassadors() {
  return (
    <div className="space-y-4">
      {topAmbassadors.map((ambassador) => (
        <div key={ambassador.rank} className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
            #{ambassador.rank}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{ambassador.name}</p>
            <p className="text-xs text-muted-foreground">{ambassador.country}</p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {ambassador.score.toLocaleString()}
          </Badge>
        </div>
      ))}
    </div>
  )
}

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const colors = {
  green: "bg-green-500",
  red: "bg-red-500",
  gray: "bg-gray-300",
}

function RecentPoints({ points }: { points: string[] }) {
  return (
    <div className="flex gap-1 mt-2">
      {points.map((pt, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded ${colors[pt as keyof typeof colors] || colors.gray}`}
        />
      ))}
    </div>
  )
}

function ScoreBlock({ userLabel }: { userLabel: string }) {
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState<string[]>([])

  const updateScore = (delta: number) => {
    const newScore = Math.max(0, score + delta)
    setScore(newScore)
    setHistory((prev) => [delta > 0 ? "green" : "red", ...prev].slice(0, 6))
  }

  return (
    <Card className="w-64 text-center p-4">
      <CardContent className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium">{userLabel}</div>
        <div className="text-6xl font-bold">{score}</div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => updateScore(1)}>+</Button>
          <Button variant="destructive" onClick={() => updateScore(-1)}>-</Button>
        </div>
        <RecentPoints points={history} />
      </CardContent>
    </Card>
  )
}

export default function MatchScoreCard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-muted p-4">
      <div className="flex gap-4">
        <ScoreBlock userLabel="User - 1" />
        <ScoreBlock userLabel="User - 1" />
      </div>
      <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold">
        Finish Match
      </Button>
    </div>
  )
}

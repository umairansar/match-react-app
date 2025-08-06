import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate, useLocation } from "react-router-dom";

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

function ScoreBlock({ userLabel, setMatchHistory }: { userLabel: string, setMatchHistory: ({delta, userLabel}: {delta: number, userLabel: string}) => void }) {
  const [score, setScore] = useState(0)

  const updateScore = (delta: number) => {
    const newScore = Math.max(0, score + delta)
    setScore(newScore)
    setMatchHistory({delta, userLabel})
  }

  return (
    <Card className="w-64 text-center p-4">
      <CardContent className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium">{userLabel}</div>
        <div className="text-6xl font-bold">{score}</div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => updateScore(1)}>+</Button>
          <Button variant="destructive" onClick={() => updateScore(-1)}>"-"</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MatchScoreCard() {
  const { state } = useLocation();

  const [userLabel1, setUserLabel1] = useState(state.teamA)
  const [userLabel2, setUserLabel2] = useState(state.teamB)
  const [history, setHistory] = useState<string[]>([])

  let navigate = useNavigate();
  const routeChange = () => {
      let path = `/game-setup`;
      navigate(path);
  }

  const setMatchHistory = ({delta, userLabel}: {delta: number, userLabel: string}) => {
    setHistory((prev) => [userLabel == userLabel1 ? "green" : "red", ...prev])
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-muted p-4">
      {/* Input Fields */}
      <div className="flex gap-4">
        <input
          type="text"
          value={userLabel1}
          onChange={(e) => setUserLabel1(e.target.value)}
          placeholder="Enter name for User 1"
          className="p-2 rounded border border-gray-300"
        />
        <input
          type="text"
          value={userLabel2}
          onChange={(e) => setUserLabel2(e.target.value)}
          placeholder="Enter name for User 2"
          className="p-2 rounded border border-gray-300"
        />
      </div>
      <div className="flex gap-4">
        <ScoreBlock userLabel={userLabel1} setMatchHistory={setMatchHistory} />
        <ScoreBlock userLabel={userLabel2} setMatchHistory={setMatchHistory} />
      </div>
      <RecentPoints points={history} />
      <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold" onClick={routeChange}>
        Finish Match
      </Button>
    </div>
  )
}

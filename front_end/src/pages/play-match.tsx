import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate, useLocation } from "react-router-dom";
import { Label } from "@radix-ui/react-label";

const colors = {
  green: "bg-green-500",
  red: "bg-red-500",
  gray: "bg-gray-300",
}

let PlayerA: string = "";
let PlayerB: string = "";


function RecentPoints({ points }: { points: string[] }) {
  return (
    <div className="flex gap-1 mt-2">
      {points.map((pt, i) => (
        <div key={i} className={`flex items-center justify-center w-8 h-8 rounded ${colors[pt as keyof typeof colors] || colors.gray}`}>
          <Label className="text-white/65 text-[18px]">{points.length - i}</Label>
        </div>
      )).reverse()}
    </div>
  )
}

function ScoreBlock({ userLabel, currentHistory, setMatchHistory }: { userLabel: string, currentHistory: string[], setMatchHistory: ({ delta, userLabel }: { delta: number, userLabel: string }) => void }) {
  const [score, setScore] = useState(0)

  const updateScore = (delta: number) => {
    if (delta < 0)
      if (!(currentHistory[0] == "green" && userLabel == PlayerA) && !(currentHistory[0] == "red" && userLabel == PlayerB))
        return;

    const newScore = Math.max(0, score + delta)
    setScore(newScore)
    setMatchHistory({ delta, userLabel })
  }

  let color = (userLabel == PlayerA) ? "green" : "red";

  return (
    <Card className={"w-100 h-50 text-center p-6 rounded-2xl shadow-md bg-radial-[at_50%] from-"+color+"-50 via-"+color+"-200 to-"+color+"-300"}>
      <CardContent className="flex flex-col items-center gap-2">
        <div className="text-2xl font-medium opacity-80">{userLabel}</div>
        <div className="text-6xl font-bold tracking-tight">{score}</div>
        <div className="flex gap-2">
          <Button className={"bg-white/60 hover:bg-white/80 text-white text-"+color+"-800 font-semibold px-5 py-5 rounded-lg backdrop-blur-sm transition"} variant="secondary" size="lg" onClick={() => updateScore(1)}>+</Button>
          <Button className={"bg-white/60 hover:bg-white/80 text-white text-"+color+"-800 font-semibold px-5 py-5 rounded-lg backdrop-blur-sm transition"} variant="secondary" size="lg" onClick={() => updateScore(-1)}>-</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MatchScoreCard() {
  const { state } = useLocation();

  const [history, setHistory] = useState<string[]>([])

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/game-setup`;
    navigate(path);
  }

  const setMatchHistory = ({ delta, userLabel }: { delta: number, userLabel: string }) => {
    if (delta > 0)
      setHistory((prev) => [userLabel == state.playerA.name ? "green" : "red", ...prev])
    else
      if ((history[0] == "green" && userLabel == state.playerA.name) || (history[0] == "red" && userLabel == state.playerB.name))
        setHistory(h => h.slice(1))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-muted p-4">
      <div className="flex gap-4">
        <ScoreBlock userLabel={state.playerA.name} currentHistory={history} setMatchHistory={setMatchHistory} />
        <ScoreBlock userLabel={state.playerB.name} currentHistory={history} setMatchHistory={setMatchHistory} />
      </div>
      <RecentPoints points={history} />
      <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold" onClick={routeChange}>
        Finish Match
      </Button>
    </div>
  )
}

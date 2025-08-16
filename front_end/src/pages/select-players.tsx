import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlayerRepository from "@/api/player";
import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";
import type { Player } from "@/models/player";
import MatchRepository from "@/api/match";

function GetPlayers({ players }: { players: Player[] }) {
  return (
    <div>
      {players.map((player) => (
        <div className="flex items-center gap-3" key={player.id}>
          <RadioGroupItem
            className="text-white"
            value={player.id.toString()}
            id={player.id.toString()}
          />
          <Label className="text-white" htmlFor={player.id.toString()}>
            {player.name}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default function RadioGroupDemo() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerA, setPlayerA] = useState<number>();
  const [playerB, setPlayerB] = useState<number>();

  let navigate = useNavigate();

  useEffect(() => {
    PlayerRepository()
      .getPlayers()
      .then((res) => setPlayers(res))
      .catch((err) => console.error(err));
  }, []);

  let half = Math.ceil(players.length / 2);
  let PlayerA = players.slice(0, half);
  let PlayerB = players.slice(half);

  const generateMatch = () => {
    if (playerA == null || playerB == null) {
      alert("Please select players for match.");
      return;
    }
  
    MatchRepository().createMatch({ players: [playerA, playerB] });
    console.log(`Match generated with Player A: ${playerA} vs Player B: ${playerB}`);
  };

  const routeChange = () => {
    if (playerA == null || playerB == null) return;
    if (playerA === playerB) return;
    generateMatch();
    let path = `/game-play`;
    navigate(path, { state: { playerA, playerB } });
  };

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <StarsBackground />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-muted p-4">
        <div className="flex gap-4">
          <RadioGroup
            value={playerA?.toString()}
            onValueChange={(val) => setPlayerA(Number(val))}
          >
            <GetPlayers players={PlayerA} />
          </RadioGroup>

          <RadioGroup
            value={playerB?.toString()}
            onValueChange={(val) => setPlayerB(Number(val))}
          >
            <GetPlayers players={PlayerB} />
          </RadioGroup>
        </div>
        <Button
          className="bg-orange-300 hover:bg-orange-400 text-black font-semibold"
          onClick={routeChange}
        >
          Begin Play!
        </Button>
      </div>
    </div>
  );
}

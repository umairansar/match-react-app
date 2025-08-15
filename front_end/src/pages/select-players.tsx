import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlayerRepository from "@/api/player";
import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";
import type { Player } from "@/models/player";

function GetPlayers({ players }: { players: Player[] }) {
    return (
        <div>
            {players.map((player) => (
                <div className="flex items-center gap-3" key={player.id}>
                    <RadioGroupItem
                        className="text-white"
                        value={player.name}
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
    const [teamA, setTeamA] = useState("");
    const [teamB, setTeamB] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        PlayerRepository()
            .getPlayers()
            .then((res) => setPlayers(res))
            .catch((err) => console.error(err));
    }, []);

    let half = Math.ceil(players.length / 2);
    let teamAPlayers = players.slice(0, half);
    let teamBPlayers = players.slice(half);

    const routeChange = () => {
        if (teamA === "" || teamB === "") return;
        let path = `/game-play`;
        navigate(path, { state: { teamA, teamB } });
    };

    return (
        <div className="relative min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <StarsBackground />
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-muted p-4">
                <div className="flex gap-4">
                    <RadioGroup defaultValue="" onValueChange={setTeamA}>
                        <GetPlayers players={teamAPlayers} />
                    </RadioGroup>
                    <RadioGroup defaultValue="" onValueChange={setTeamB}>
                        <GetPlayers players={teamBPlayers} />
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

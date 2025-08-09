import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { type Player, type CreatePlayerRequest } from "../models/player";
import { type TeamType } from "../models/team";
import PlayerRepository from "@/api/player";
import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";

function GetPlayers({ teamType }: { teamType: TeamType }) {
    let playerRepository = PlayerRepository();
    const [team, setTeam] = useState<Player[]>([]);

    useEffect(() => {
        playerRepository.getPlayers()
            .then((res) => {
                console.log(res);
                let half = Math.ceil(res.length / 2);
                if (teamType == 'TeamA')
                    setTeam(res.slice(0, half));
                else
                    setTeam(res.slice(half));
            })
            .catch(err => console.error(err));
    }, []);

    // create logic
    // let newPlayerRequest: CreatePlayerRequest = {name: "Km", department: "partner"};
    // const [newPlayer, setNewPlayer] = useState<Player>();

    // useEffect(() => {
    // playerRepository.createPlayer(newPlayerRequest)
    //     .then((res) => {
    //     console.log(res);  
    //     setNewPlayer(res);
    //     })
    //     .catch(err => console.error(err));
    // }, []);

    return (
        <div>{
            team.map((player, index) =>
                <div className="flex items-center gap-3" key={player.id}>
                    <RadioGroupItem className="text-white" value={player.id.toString()} id={`player-${index}`} />
                    <Label className="text-white" htmlFor={`player-${index}`}>{player.name}</Label>
                </div>)
        }</div>
    )
}

export default function RadioGroupDemo() {
    const [teamA, setTeamA] = useState("")
    const [teamB, setTeamB] = useState("")

    let navigate = useNavigate();
    const routeChange = () => {
        if (teamA == "" || teamB == "")
            return
        let path = `/game-play`;
        navigate(path, { state: { teamA: teamA, teamB: teamB } });
    }

    return (
        <div className="relative min-h-screen">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <StarsBackground />
            </div>
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-muted p-4">
                <div className="flex gap-4">
                    <RadioGroup defaultValue="comfortable" onValueChange={setTeamA}>
                        <GetPlayers teamType="TeamA" />
                    </RadioGroup>
                    <RadioGroup defaultValue="comfortable" onValueChange={setTeamB}>
                        <GetPlayers teamType="TeamB" />
                    </RadioGroup>
                </div>
                <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold" onClick={routeChange}>
                    Begin Play!
                </Button>
            </div>
        </div>
    )
}

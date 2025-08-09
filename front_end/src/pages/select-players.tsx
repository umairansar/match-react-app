import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
// import ApiClient from "../api/api-client";
import { type Player, type CreatePlayerRequest } from "../models/player"
import PlayerRepository from "@/api/player";
let playerRepository = PlayerRepository();

function GetPlayers() {
    let groupA = ["Talha", "Umair", "Nayef"]
    let groupB = ["Nuno", "Umar", "Zarboo"]

    const [player, setPlayer] = useState<Player[]>([]);
    useEffect(() => {
        playerRepository.getPlayers()
          .then((res) => {
            console.log(res);  
            setPlayer(res);
          })
          .catch(err => console.error(err));
      }, []);

    let newPlayerRequest: CreatePlayerRequest = {name: "Km", department: "partner"};
    const [newPlayer, setNewPlayer] = useState<Player>();

    useEffect(() => {
    playerRepository.createPlayer(newPlayerRequest)
        .then((res) => {
        console.log(res);  
        setNewPlayer(res);
        })
        .catch(err => console.error(err));
    }, []);

    const names = player.map(p => p.name);
    const np = newPlayer?.name;
    return ([
        [np],
        names
        ,
        groupA.map((player, index) =>
            <div className="flex items-center gap-3">
                <RadioGroupItem value={player} id={`player-${index}`} />
                <Label htmlFor={`player-${index}`}>{player}</Label>
            </div>),
        groupB.map((player, index) =>
            <div className="flex items-center gap-3">
                <RadioGroupItem value={player} id={`player-${index}`} />
                <Label htmlFor={`player-${index}`}>{player}</Label>
            </div>)
    ])
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

    let [n, p, groupA, groupB] = GetPlayers();
    console.log(p);
    console.log(n);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-muted p-4">
            <div className="flex gap-4">
                <RadioGroup defaultValue="comfortable" onValueChange={setTeamA}>
                    {groupA}
                </RadioGroup>
                <RadioGroup defaultValue="comfortable" onValueChange={setTeamB}>
                    {groupB}
                </RadioGroup>
            </div>
            <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold" onClick={routeChange}>
                Begin Play!
            </Button>
        </div>
    )
}

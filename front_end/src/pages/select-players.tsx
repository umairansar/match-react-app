import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import ApiClient from "../api/api-client";
import { type Player } from "../models/player"

function GetPlayers() {
    let groupA = ["Talha", "Umair", "Nayef"]
    let groupB = ["Nuno", "Umar", "Zarboo"]
    let api = ApiClient("http://localhost:8080");
    let res = api.get<Player[]>('/user/users').then(response => console.log(response));
    return ([
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
    const routeChange = () => 
        {
            if (teamA == "" || teamB == "")
                return 
            let path = `/game-play`;
            navigate(path, {state:{teamA:teamA, teamB:teamB}});
        }

    let [groupA, groupB] = GetPlayers();

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

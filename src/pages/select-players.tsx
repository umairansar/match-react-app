import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

function GetPlayers() {
    let groupA = ["Talha", "Umair", "Nayef"]
    let groupB = ["Nuno", "Umar", "Zarboo"]
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
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/game-play`;
        navigate(path);
    }

    let [groupA, groupB] = GetPlayers();

    return (
        <div>
            <div className="flex gap-4">
                <RadioGroup defaultValue="comfortable">
                    {groupA}
                </RadioGroup>
                <RadioGroup defaultValue="comfortable">
                    {groupB}
                </RadioGroup>
            </div>
            <Button className="bg-orange-300 hover:bg-orange-400 text-black font-semibold" onClick={routeChange}>
                Begin Play!
            </Button>
        </div>
    )
}

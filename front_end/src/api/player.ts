// Inspired by 
// https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
// https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/

import api from "../api/api-client";
import { type Player, type CreatePlayerRequest } from "../models/player"

const PlayerRepository = () => ({
    getPlayers: async () => {
        return await api.get<Player[]>('/user/users');
    }
    ,
    createPlayer: async (player: CreatePlayerRequest) => {
        return await api.post<CreatePlayerRequest, Player>('/user/create', player);
    }
    });

export default PlayerRepository;
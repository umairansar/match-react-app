// Inspired by 
// https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
// https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/

import api from "./api-client";
import type { Match, CreateMatchRequest, UpdateMatchRequest } from "@/models/match";

const MatchRepository = () => ({
    getMatches: async () => {
        return await api.get<Match[]>('/match/matches');
    }
    ,
    createMatch: async (match: CreateMatchRequest) => {
        return await api.post<CreateMatchRequest, Match>('/match/create', match);
    }
    });

export default MatchRepository;
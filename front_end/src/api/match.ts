// Inspired by
// https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
// https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/

import api from "./api-client";
import type { Match, CreateMatchRequest, UpdateMatchRequest, Score } from "@/models/match";

const MatchRepository = () => ({
  getMatches: async () => {
    return await api.get<Match[]>("/match/matches");
  },
  createMatch: async (match: CreateMatchRequest) => {
    return await api.post<CreateMatchRequest, Match>("/match/create", match);
  },
  finishMatch: async ({ match_id, scores }: { match_id: number; scores: Score[] }) => {
    return await api.patch<UpdateMatchRequest, Match>(`/match/finish?match_id=${match_id}`, {
      scores,
    });
  },
});

export default MatchRepository;

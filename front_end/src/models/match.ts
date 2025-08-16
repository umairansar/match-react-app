export type Match = {
  id: Number;
  winner: Number;
  loser: Number;
};

export type CreateMatchRequest = {
  players: number[];
};

export type Score = {
  user_id: number;
  points: number;
};

export type UpdateMatchRequest = {
  scores: Score[];
};

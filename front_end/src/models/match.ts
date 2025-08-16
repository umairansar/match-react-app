export type Match = {
    id : Number
    winner : Number,
    loser : Number
}

export type CreateMatchRequest = {
    players : number[]
}

type scores = {
    player_id : number,
    points: number
}

export type UpdateMatchRequest = {
   match_id : Number,
   scores: scores[]
}

export type Match = {
    id : Number
    winner : Number,
    loser : Number
}

export type CreateMatchRequest = {
    players : number[]
}

export type UpdateMatchRequest = {
    winner : Number,
    loser : Number
}

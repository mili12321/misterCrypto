import { Move } from 'src/app/models/move.model'; 

export interface User {
    _id?: string,
    name: string,
    coins: number,
    moves: Move[],
    password?: string,
    firstName?: string,
    lastName?: string,
    token?: string,
    img?:number
}
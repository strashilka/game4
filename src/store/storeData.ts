import { ItemColors } from 'views/ColorItem/ItemColors';

export enum GameStatus {
    Idle,
    Online,
    Victory
}

export type GameResult = {
    startDate: Date,
    question: Array<ItemColors>
    duration: number,
    moves: number,
    victory: boolean
}

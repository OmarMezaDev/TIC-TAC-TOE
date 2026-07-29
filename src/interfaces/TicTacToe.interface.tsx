export type UserType = 'O' | 'X';

export interface TicTacToeState {
    game: Array<string | null>;
    isGameOver: boolean;
    player: UserType;
    playerWinner: UserType | null;
}
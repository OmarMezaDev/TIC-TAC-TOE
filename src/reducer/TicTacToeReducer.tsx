import type { TicTacToeState, UserType } from "@/interfaces/TicTacToe.interface"

export type TicTacToeAction =
    { type: 'CHECK_WINNER' }
    | { type: 'RESET_GAME' }
    | { type: 'CLICK_CELDA', payload: number }
    | {
        type: 'LOAD_GAME_LOCALSTORAGE', payload: {
            game: Array<string | null>
            player: UserType | null,
            isGameOver: boolean,
        }
    }

export const initialGameState = (): TicTacToeState => {

    const initialGameState = new Array(9).fill('', 0, 9);

    return {
        game: initialGameState,
        isGameOver: false,
        player: "X",
        playerWinner: null,
    }

}

const WinnerCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

export const TicTacToeReducer = (state: TicTacToeState, action: TicTacToeAction): TicTacToeState => {

    const checkWinner = (currentGame: Array<string | null>): boolean => {

        let winner = false;

        WinnerCombination.forEach(combinateItem => {

            if (currentGame[combinateItem[0]] === state.player && currentGame[combinateItem[1]] === state.player && currentGame[combinateItem[2]] === state.player)
                winner = true;

        });

        return winner;

    }

    switch (action.type) {

        case "CLICK_CELDA": {

            if (state.game[action.payload] || state.isGameOver)
                return state;

            const newGame = state.game.map((item, index) => {

                if (index === action.payload && !item)
                    return state.player;

                return item;

            });

            // setGame(newGame);

            if (!checkWinner(newGame)) {

                const value = newGame.find((item) => item === '')

                if (value !== '') {
                    return {
                        ...state,
                        game: newGame,
                        isGameOver: true,
                    }
                }

                const newPlayer = state.player === 'X' ? 'O' : 'X';

                return {
                    ...state,
                    game: newGame,
                    player: newPlayer,
                };

            }

            return {
                ...state,
                game: newGame,
                playerWinner: state.player,
                isGameOver: true
            }

        }

        case "RESET_GAME": {

            return initialGameState();

        }

        case "LOAD_GAME_LOCALSTORAGE": {

            return {
                ...state,
                game: action.payload.game,
                player: action.payload.player,
                isGameOver: action.payload.isGameOver
            };

        }

        default: {
            return state;
        }

    }

    return state;

}
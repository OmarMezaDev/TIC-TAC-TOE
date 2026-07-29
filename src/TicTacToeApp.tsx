
import { useEffect, useReducer } from "react"
import { Button } from "./components/ui/button";
import conffetti from 'canvas-confetti';
import { initialGameState, TicTacToeReducer } from "./reducer/TicTacToeReducer";

export const TicTacToeApp = () => {

    const [state, dispatch] = useReducer(TicTacToeReducer, initialGameState());

    const handleClick = (event: React.MouseEvent) => {

        const indexElement = +(event.target as HTMLElement)?.dataset.index;

        dispatch({ type: "CLICK_CELDA", payload: indexElement ?? -1 });

    }

    const handleResetGame = () => {

        dispatch({ type: "RESET_GAME" });

    }

    useEffect(() => {

        if (state.game === initialGameState().game) {

            const gameStorage = localStorage.getItem('game-tictactoe');

            if (!gameStorage) {
                localStorage.setItem('game-tictactoe', JSON.stringify({ game: state.game, player: state.player, isGameOver: state.isGameOver }));
                return;
            }

            const gameObjectStorage = JSON.parse(gameStorage);
            dispatch({ type: "LOAD_GAME_LOCALSTORAGE", payload: { game: gameObjectStorage.game, player: gameObjectStorage.player, isGameOver: gameObjectStorage.isGameover } });

            return;

        }

        localStorage.setItem('game-tictactoe', JSON.stringify({ game: state.game, player: state.player, isGameOver: state.isGameOver }));

    }, [state.game]);

    useEffect(() => {

        if (state.playerWinner)
            conffetti({
                particleCount: 300,
                spread: 200,
                startVelocity: 45,
                ticks: 800,
                scalar: 2,
            });

    }, [state.isGameOver]);

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-4 xl:w-[50%] md:w-[75%] rounded-md p-4 mb-2">

                <h1 className="text-2xl md:text-4xl text-white font-bold">TIC TAC TOE</h1>

                {
                    !state.isGameOver ?
                        <div className="flex justify-around items-center gap-4">
                            <h3 className="text-md md:text-2xl text-white">Player</h3>
                            <h3 className="text-md border-2 p-2 rounded-md bg-slate-700">{state.player === 'X' ? '❌​' : '🟢'}</h3>
                        </div> :

                        !state.playerWinner ?
                            <h1 className="text-lg md:text-4xl text-gray-300">Empate</h1> :
                            <h1 className={`text-lg md:text-4xl ${state.playerWinner === 'O' ? 'text-green-500' : 'text-red-500'} font-thin`}>
                                Player < span > {state.playerWinner === 'X' ? '❌​' : '🟢'}</span> WINNER
                            </h1>
                }

                <Button className='h-10 w-30 text-center text-white bg-red-500 hover:bg-red-600 border border-gray-600' onClick={handleResetGame}>Reiniciar</Button>

            </div >
            <div className="grid grid-cols-3 gap-3 bg-slate-800 p-4 rounded-xl shadow-2xl w-[90%] md:w-[65%] lg:w-[40%]">
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="0">{state.game === null || !state.game[0] ? '' : (state.game[0] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="1">{state.game === null || !state.game[1] ? '' : (state.game[1] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="2">{state.game === null || !state.game[2] ? '' : (state.game[2] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="3">{state.game === null || !state.game[3] ? '' : (state.game[3] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="4">{state.game === null || !state.game[4] ? '' : (state.game[4] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="5">{state.game === null || !state.game[5] ? '' : (state.game[5] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="6">{state.game === null || !state.game[6] ? '' : (state.game[6] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="7">{state.game === null || !state.game[7] ? '' : (state.game[7] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className={`cell bg-slate-700 hover:bg-slate-600 rounded-lg text-4xl md:text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer h-20 md:h-30 lg:h-40`} data-index="8">{state.game === null || !state.game[8] ? '' : (state.game[8] === 'X' ? '❌​' : '🟢')}</button>
            </div>

        </>
    )
}

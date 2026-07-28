import { useEffect, useState } from "react"
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import conffetti from 'canvas-confetti';

type Player = 'X' | 'O';

const WinnerCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [1, 4, 8],
    [2, 4, 6]
]

const initialGameState = new Array(9).fill('', 0, 9);

export const TicTacToeApp = () => {

    const [player, setPlayer] = useState<Player>('X');
    const [combinationWinner, setCombinationWinner] = useState<Array<number>>(null);
    const [isGameOver, setGameOver] = useState<Boolean>(false);
    const [playerWinner, setPlayerWinner] = useState<Player | null>(null);
    const [game, setGame] = useState<Array<string> | null>(initialGameState)

    useEffect(() => {

        if (game === initialGameState) {

            const gameStorage = localStorage.getItem('game-tictactoe');

            if (!gameStorage)
                return;

            const gameObjectStorage = JSON.parse(gameStorage);
            setGame(gameObjectStorage.game);
            setPlayer(gameObjectStorage.player);
            setGameOver(gameObjectStorage.isGameOver);

            return;
        }


        localStorage.setItem('game-tictactoe', JSON.stringify({ game: game, player: player, isGameOver: isGameOver }));

    }, [game, setGame]);

    const checkWinner = (currentGame: Array<string>): boolean => {

        let winner = false;

        WinnerCombination.forEach(combinateItem => {

            // console.log(combinateItem);
            // console.log(currentGame[combinateItem[0]], currentGame[combinateItem[1]], currentGame[combinateItem[2]]);

            if (currentGame[combinateItem[0]] === player && currentGame[combinateItem[1]] === player && currentGame[combinateItem[2]] === player) {
                winner = true;
                setCombinationWinner(combinateItem)
            }

        });

        return winner;

    }

    const handleClick = (event: React.MouseEvent) => {

        const indexElement = (event.target as HTMLElement).dataset.index;

        if (game[indexElement] || isGameOver)
            return;

        const newGame = game.map((item, index) => {

            if (index === +indexElement && !item)
                return player;

            return item;

        });

        setGame(newGame);

        if (checkWinner(newGame)) {
            setPlayerWinner(player)
            setGameOver(true);
            return;
        }

        const value = newGame.find((item) => item === '')

        console.log({ newGame, value });

        if (value !== '')
            setGameOver(true);

        setPlayer(player === 'X' ? 'O' : 'X');

    }

    const handleResetGame = () => {

        setGame(new Array(9).fill('', 0, 9));
        setGameOver(false);
        setPlayerWinner(null);
    }



    if (isGameOver && playerWinner !== null)
        conffetti({
            particleCount: 300,
            spread: 200,
            startVelocity: 45,
            ticks: 800,
            scalar: 2,
        });


    return (
        <>
            <div className="flex flex-col justify-center items-center gap-4 w-[50%] rounded-md p-4 mb-2">

                <h1 className="text-4xl text-white font-bold">TIC TAC TOE</h1>

                {
                    !isGameOver && <div className="flex justify-around items-center gap-4">
                        <h3 className="text-2xl text-white">Player</h3>
                        <h3 className="text-2xl">{player === 'X' ? '❌​' : '🟢'}</h3>
                    </div>
                }

                {
                    isGameOver && <div className="flex justify-center items-center">
                        <h1 className={`text-4xl ${playerWinner === 'O' ? 'text-green-500' : 'text-red-500'} font-thin`}>Player <span>{playerWinner === 'X' ? '❌​' : '🟢'}</span> WINNER</h1>
                    </div>
                }

                <Button variant="ghost" className='h-10 w-30 text-center bg-gray-800 text-white' onClick={handleResetGame}>Reiniciar</Button>

            </div>
            <div className="grid grid-cols-3 gap-3 bg-slate-800 p-4 rounded-xl shadow-2xl xl:w-[50%] md:w-[75%]">
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="0">{!game[0] ? '' : (game[0] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="1">{!game[1] ? '' : (game[1] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="2">{!game[2] ? '' : (game[2] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="3">{!game[3] ? '' : (game[3] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="4">{!game[4] ? '' : (game[4] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="5">{!game[5] ? '' : (game[5] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="6">{!game[6] ? '' : (game[6] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="7">{!game[7] ? '' : (game[7] === 'X' ? '❌​' : '🟢')}</button>
                <button onClick={e => handleClick(e)} className="cell bg-slate-700 hover:bg-slate-600 rounded-lg text-5xl font-bold flex items-center justify-center transition-colors text-white cursor-pointer min-h-40" data-index="8">{!game[8] ? '' : (game[8] === 'X' ? '❌​' : '🟢')}</button>
            </div>

            !   {/*)  ? '' : (

            {/* <div>
                <Input value={}/>
            </div> */}
        </>
    )
}

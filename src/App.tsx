import { useState } from "react";

type Player = "red" | "yellow";
type Cell = Player | null;
type Board = Cell[][];

const cols = 7;
const rows = 6;

function createBoard(): Board {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

function connectFour(board: Board, row: number, col: number, player: Player): boolean {
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]] as const;

  for (const [dr, dc] of directions) {
    let count = 1;

    for (let step = 1; step < 4; step++) {
      if (board[row + dr * step]?.[col + dc * step] === player) count++;
      else break;
    }

    for (let step = 1; step < 4; step++) {
      if (board[row - dr * step]?.[col - dc * step] === player) count++;
      else break;
    }

    if (count >= 4) return true;
  }

  return false;
}

function boardFull(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

function getPlayerDisc(player: Player) {
  return player === "red" ? "🔴" : "⭐";
}

export default function App() {
  const [board, setBoard] = useState(createBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("red");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  function dropDisc(col: number) {
    if (gameOver === true) return;

    const nextBoard = board.map(row => [...row]);
    const nextPlayer = currentPlayer === "red" ? "yellow" : "red";

    for (let row = rows - 1; row >= 0; row--) {
      if (nextBoard[row][col] !== null) continue;

      nextBoard[row][col] = currentPlayer;
      setBoard(nextBoard);

      if (connectFour(nextBoard, row, col, currentPlayer) === true) {
        setWinner(currentPlayer);
        setGameOver(true);
      } else if (boardFull(nextBoard) === true) {
        setGameOver(true);
      } else {
        setCurrentPlayer(nextPlayer);
      }

      return;
    }
  }

  function getDiscClass(player: Player) {
    const base = "board__disc";
    const color = `board__disc--${player}`;
    const faded = (gameOver === true && winner !== player) && "board__disc--faded";

    return [base, color, faded].filter(Boolean).join(" ");
  }

  return (
    <>
      <header className="header">
        <h1 className="header__title">
          <span className="header__connect">Connect</span>
          <span className="header__four">Four</span>
        </h1>
      </header>

      <div className="board">
        <div className="board__top">
          {Array.from({ length: cols }, (_, colIndex) => (
            <div key={colIndex} className="board__column">
              <button className="board__btn" onClick={() => dropDisc(colIndex)}>
                <svg viewBox="0 0 24 24" className="board__arrow">
                  <path d="M5 8 L19 8 L12 18 Z" />
                </svg>
              </button>

              {gameOver !== true && (
                <div className="board__disc--preview">
                  <div className={`board__disc board__disc--${currentPlayer}`}>
                    {getPlayerDisc(currentPlayer)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="board__grid">
          {board.map((row, rowIndex) => row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="board__cell">
              {cell !== null && (
                <div className={getDiscClass(cell)}>
                  {getPlayerDisc(cell)}
                </div>
              )}
            </div>
          )))}
        </div>
      </div>
    </>
  );
}

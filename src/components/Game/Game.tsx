import { JSX, useState } from "react";

import "./Game.css";

type Player = "red" | "yellow";
type Cell = Player | null;
type Board = Cell[][];

type Status =
  | { type: "playing" }
  | { type: "won"; winner: Player }
  | { type: "draw" };

type Game = {
  board: Board;
  currentPlayer: Player;
  status: Status;
};

const cols = 7;
const rows = 6;

export default function Game() {
  const [game, setGame] = useState<Game>(createGame);

  function handleDrop(col: number) {
    setGame(game => dropDisc(game, col));
  }

  return (
    <div className="board">
      <div className="board__top">
        {Array.from({ length: cols }, (_, colIndex) => (
          <div key={colIndex} className="board__column">
            <button className="board__btn" onClick={() => handleDrop(colIndex)}>
              <svg viewBox="0 0 24 24" className="board__arrow">
                <path d="M5 8 L19 8 L12 18 Z" />
              </svg>
            </button>

            {game.status.type === "playing" && (
              <div className="board__disc--preview">
                <div className={getDiscClass(game.currentPlayer, game.status)}>
                  {getDiscIcon(game.currentPlayer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="board__grid">
        {game.board.map((row, rowIndex) => row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="board__cell">
            {cell !== null && (
              <div className={getDiscClass(cell, game.status)}>
                {getDiscIcon(cell)}
              </div>
            )}
          </div>
        )))}
      </div>
    </div>
  );
}

function createGame(): Game {
  return {
    board: createBoard(),
    currentPlayer: "red",
    status: { type: "playing" }
  };
}

function createBoard(): Board {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

function dropDisc(game: Game, col: number): Game {
  if (game.status.type !== "playing") return game;

  const board = game.board.map(row => [...row]);
  const player = game.currentPlayer;

  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][col] !== null) continue;

    board[row][col] = player;

    if (connectFour(board, row, col, player) === true) {
      return {
        board: board,
        currentPlayer: player,
        status: { type: "won", winner: player }
      };
    }

    else if (boardFull(board) === true) {
      return {
        board: board,
        currentPlayer: player,
        status: { type: "draw" }
      };
    }

    else {
      return {
        board: board,
        currentPlayer: player === "red" ? "yellow" : "red",
        status: { type: "playing" }
      };
    }
  }

  return game;
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

function getDiscClass(player: Player, status: Status): string {
  const base = "board__disc";
  const color = `board__disc--${player}`;
  const faded = (status.type === "won" && status.winner !== player) && "board__disc--faded";

  return [base, color, faded].filter(Boolean).join(" ");
}

function getDiscIcon(player: Player): JSX.Element {
  return player === "red" ? (
    <svg viewBox="0 0 24 24" className="board__disc-icon board__disc-icon--circle">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="board__disc-icon board__disc-icon--star">
      <path d="M12 17.3L18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2l5.5 4.7L5.8 21 Z" />
    </svg>
  );
}

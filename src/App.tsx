import { useState } from "react";

type Player = "red" | "yellow";
type Cell = Player | null;
type Board = Cell[][];

const cols = 7;
const rows = 6;

function createBoard(): Board {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

export default function App() {
  const [board, setBoard] = useState(createBoard);

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
              <button className="board__btn">
                <svg viewBox="0 0 16 16" width="16" height="16" className="board__arrow">
                  <path d="M0 4 L16 4 L8 12 Z" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="board__grid">
          {board.map((row, rowIndex) => row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="board__cell">
            </div>
          )))}
        </div>
      </div>
    </>
  );
}

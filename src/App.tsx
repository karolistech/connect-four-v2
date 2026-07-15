import { useState } from "react";

import { Header, Menu, Game } from "./components";

import "./App.css";

export default function App() {
  const [gameId, setGameId] = useState(0);

  function newGame() {
    setGameId(id => id + 1);
  }

  return (
    <div className="app">
      <Header />
      <Menu newGame={newGame} />
      <Game key={gameId} />
    </div>
  );
}

import { useState } from "react";

import Header from "./Header";
import Menu from "./Menu";
import Game from "./Game";

export default function App() {
  const [gameId, setGameId] = useState(0);

  function newGame() {
    setGameId(id => id + 1);
  }

  return (
    <>
      <Header />
      <Menu newGame={newGame} />
      <Game key={gameId} />
    </>
  );
}

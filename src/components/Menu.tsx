import { useState } from "react";

import "./Menu.css";

type MenuProps = { newGame: () => void };
type RulesModalProps = { closeRules: () => void };

export default function Menu({ newGame }: MenuProps) {
  const [rulesOpen, setRulesOpen] = useState(false);

  function openRules() {
    setRulesOpen(true);
  }

  function closeRules() {
    setRulesOpen(false);
  }

  return (
    <>
      <div className="menu">
        <button className="menu__btn" onClick={newGame}>New Game</button>
        <button className="menu__btn" onClick={openRules}>Rules</button>
      </div>

      {rulesOpen === true && <RulesModal closeRules={closeRules} />}
    </>
  );
}

function RulesModal({ closeRules }: RulesModalProps) {
  return (
    <>
      <div className="rules-modal__backdrop" />

      <div className="rules-modal">
        <div className="rules-modal__content">
          <h2 className="rules-modal__title">Rules</h2>

          <div className="rules-modal__section">
            <h3 className="rules-modal__subtitle">Objective</h3>
            <p className="rules-modal__text">
              Be the first player to connect four discs of the same color in a row,
              vertically, horizontally, or diagonally.
            </p>
          </div>

          <div className="rules-modal__section">
            <h3 className="rules-modal__subtitle">How to Play</h3>
            <ol className="rules-modal__list">
              <li>Red goes first in the first game.</li>
              <li>Players take turns dropping one disc per turn.</li>
              <li>The game ends when a player connects four discs in a row or when the board is full.</li>
              <li>In the next game, the starting player switches.</li>
            </ol>
          </div>

          <button className="rules-modal__btn" onClick={closeRules}>✓</button>
        </div>
      </div>
    </>
  );
}

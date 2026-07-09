const cols = 7;

export default function App() {
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
      </div>
    </>
  );
}

import logo from './logo.svg';
import './App.css';
import GameBoard from './GameBoard';

function App() {
  let size = 8;
  let mines = 8;

  return (
    <div className="App">
      <h1>MinesweeperReact</h1>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <GameBoard size={size} mines={mines}></GameBoard>
    </div>
  );
}

export default App;

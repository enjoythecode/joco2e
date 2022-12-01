import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

interface Game {}

interface R {
  state: any,
  history: R[],
  next(arg0: Game): R | null,
}

abstract class BaseR implements R {
  state: any;
  history: R[];

  constructor() {
    this.history = [];
    this.state = {};
  }

  abstract next(arg0: Game): R | null;
}


class TurnR extends BaseR implements R {

  constructor() {
    super()
  }

  next(Game) {
    return null;
  }

}

class GameR extends BaseR implements R {

  constructor() {
    super()
    this.state = {
      "gameStarted": false,
    }
  }

  next(Game) {
    if (!this.state.gameStarted) {
      this.state.gameStarted = true;
      return new TurnR();
    }
    return null;
  }

}

class Interpreter {

  execution_stack: R[];
  game: Game;

  constructor(seedR : R) {
    this.execution_stack = [seedR];
    this.game = {};
  }

  step() {
    const tip = this.execution_stack[this.execution_stack.length-1];
    const next = tip.next(this.game);

    if (next == null){
      this.execution_stack.pop();
    } else {
      this.execution_stack.push(next);
    }

    console.log(this.execution_stack);
  }

}


function App() {
  const [interpreter, setInterpreter] = useState<Interpreter | null>(null);

  const createGame = () => {
    setInterpreter(new Interpreter(new GameR()));
  }

  const style = { border: '1px solid red' };

  const tr = new TurnR();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello! 
        </p>
        <button onClick={createGame}>create game</button>
        {interpreter !== null ? <button onClick={() => {interpreter.step()}}>step</button>: "interpreter not yet created"}
      </header>
    </div>
  );
}

export default App;

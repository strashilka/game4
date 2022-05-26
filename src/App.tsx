import * as React from 'react';
import QuestionBoard from 'views/QuestionBoard/QuestionBoard';
import InfoBoard from 'views/InfoBoard/InfoBoard';
import GameBoard from 'views/GameBoard/GameBoard';
import StartNewGameButton from './views/StartNewGameButton/StartNewGameButton';

function App() {
  return (
    <div className="App">
      <StartNewGameButton />
      <InfoBoard />
      <QuestionBoard />
      <GameBoard />
    </div>
  );
}

export default App;

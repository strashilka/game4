import * as React from 'react';
import QuestionBoard from 'views/QuestionBoard/QuestionBoard';
import InfoBoard from 'views/InfoBoard/InfoBoard';
import GameBoard from 'views/GameBoard/GameBoard';
import Footer from 'views/Footer/Footer';
import StartNewGameButton from 'views/StartNewGameButton/StartNewGameButton';
import DialogMessage from 'components/DialogMessage/DialogMessage';

function App() {
  return (
    <div className="App">
      <DialogMessage />
      <StartNewGameButton />
      <InfoBoard />
      <QuestionBoard />
      <GameBoard />
      <Footer />
    </div>
  );
}

export default App;

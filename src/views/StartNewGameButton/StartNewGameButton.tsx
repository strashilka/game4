import * as React from 'react';
import { useDispatch } from 'react-redux';
import { startNewGame } from 'store/gameSlice';

export default function StartNewGameButton() {
  const dispatch = useDispatch();
  function handleStartGame() {
    dispatch(startNewGame());
  }
  return (
    <button onClick={handleStartGame} value="Начать игру" type="button" aria-label="Start new game">Начать игру</button>
  );
}

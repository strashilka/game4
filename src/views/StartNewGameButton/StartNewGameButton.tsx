import * as React from 'react';
import { startNewGame } from 'store/gameSlice';
import { useAppDispatch } from 'store/store';

export default function StartNewGameButton() {
  const dispatch = useAppDispatch();
  function handleStartGame() {
    dispatch(startNewGame());
  }
  return (
    <button
      onClick={handleStartGame}
      value="Начать игру "
      type="button"
      aria-label="Start new game ">
      Начать игру
    </button>
  );
}

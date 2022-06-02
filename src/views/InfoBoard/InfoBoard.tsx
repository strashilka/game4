import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectGameDuration, selectGameStatus, selectMovesCount } from 'store/gameSlice';
import { GameStatus } from 'store/storeData';

export default function InfoBoard() {
  /**
   * типы должны резолвиться сами
   */
  const status: GameStatus = useSelector(selectGameStatus);
  const moves: GameStatus = useSelector(selectMovesCount);
  const duration: GameStatus = useSelector(selectGameDuration);
  return (
    <div>
      <p>
        {status === GameStatus.Idle
          ? 'Правила игры: мы загадали 4 цвета. Вам необходим угадать на какой позиции стоит какой цвет. Если вы правильно укажите и позицию и цвет, то индикатор правильного ответа будет черным, если угадали правильно только позицию, тоиндикатор будет серым, в противном случаее останется белым.'
          : ''}
        {status === GameStatus.Online ? `Ход номер ${moves}` : ''}
        {status === GameStatus.Victory
          ? `Поздравляем! Ваш результат ${moves} ходов и ${duration} секунд`
          : ''}
      </p>
    </div>
  );
}

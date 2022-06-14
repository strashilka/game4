import * as React from 'react';
import GameRow from 'views/GameRow/GameRow';
import { GameStatus } from 'store/storeData';
import { useSelector } from 'react-redux';
import { selectAnswer, selectGameStatus } from 'store/gameSlice';
import { useMemo } from 'react';

export default function GameBoard() {
  const status = useSelector(selectGameStatus);
  const answers = useSelector(selectAnswer);

  const revereAnswers = useMemo(() => answers.slice(0).reverse(), [answers]);

  if (status === GameStatus.Idle) {
    return null;
  }

  return (
    <div>
      {revereAnswers.map((answer, index) => {
        let key = '';
        for (let i = 0; i < 4; i += 1) {
          key += answer[i].color.toString() + index;
        }
        return <GameRow row={revereAnswers.length - 1 - index} key={key} />;
      })}
    </div>
  );
}

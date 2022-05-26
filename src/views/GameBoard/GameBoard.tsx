import * as React from 'react';
import GameRow from 'views/GameRow/GameRow';
import { GameStatus } from 'store/storeData';
import { useSelector } from 'react-redux';
import { selectAnswers, selectGameStatus } from 'store/gameSlice';
import { ItemColorWithId } from 'views/ColorItem/ItemColors';

export default function GameBoard() {
  const status:GameStatus = useSelector(selectGameStatus);
  const answers:Array<Array<ItemColorWithId>> = useSelector(selectAnswers);

  if (status === GameStatus.Idle) return <div />;

  const revereAnswers = answers.slice(0).reverse();
  return (
    <div>
      {revereAnswers.map((answer:Array<ItemColorWithId>, index) => (
        <GameRow
          row={revereAnswers.length - 1 - index}
          key={index.toString() + answer.toString()}
        />
      ))}
    </div>
  );
}

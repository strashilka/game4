import * as React from 'react';
import GameRow from 'views/GameRow/GameRow';
import { GameStatus } from 'store/storeData';
import { useSelector } from 'react-redux';
import { selectAnswers, selectGameStatus } from 'store/gameSlice';
import { ItemColorWithId } from 'views/ColorItem/ItemColors';

export default function GameBoard() {
  /**
   * GameStatus должен резолвиться сам
   */
  const status: GameStatus = useSelector(selectGameStatus);
  /**
   * тип массива можно указывать как ItemColorWithId[][], как по мне так легче читать, но это вкусовщина и зависит от команды
   */
  const answers: Array<Array<ItemColorWithId>> = useSelector(selectAnswers);

  /**
   * null если компонент не надо рендерить
   */
  if (status === GameStatus.Idle) return <div />;

  /**
   * сложные вычислямые значения лучше заключать в useMemo(). это позволяет не вычислять их при каждом рендере
   * const revereAnswers = useMemo(() => answers.slice(0).reverse(), [answers]);
   */
  const revereAnswers = answers.slice(0).reverse();
  return (
    <div>
      {/* тип answer должен резолвиться сам */}
      {/* можно писать key={`${index}${answer}`} */}
      {revereAnswers.map((answer: Array<ItemColorWithId>, index) => (
        <GameRow
          row={revereAnswers.length - 1 - index}
          key={index.toString() + answer.toString()}
        />
      ))}
    </div>
  );
}

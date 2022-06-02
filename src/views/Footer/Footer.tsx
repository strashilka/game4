import { GameStatus } from 'store/storeData';
import { useSelector } from 'react-redux';
import { selectGameStatus } from 'store/gameSlice';
import * as React from 'react';

export default function Footer() {
  const status: GameStatus = useSelector(selectGameStatus);

  /**
   * если компонент не нужно рендерить, можно возвращать null. а еще код, отделенный скобками, легче читать
   */
  if (status !== GameStatus.Online) {
    return <div />;
  }

  return (
    <div>
      <p>
        <span className="footerInfoItem " style={{ backgroundColor: 'black' }} />
        угадали и цвет и позицию
      </p>
      <p>
        <span className="footerInfoItem " style={{ backgroundColor: 'lightgray' }} />
        угадали и цвет, но не угадали позицию
      </p>
      <p>
        <span className="footerInfoItem " style={{ backgroundColor: 'white' }} />
        не угадали цвет
      </p>
    </div>
  );
}

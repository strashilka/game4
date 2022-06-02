import * as React from 'react';
import { ItemColors } from 'views/ColorItem/ItemColors';
import { useSelector } from 'react-redux';
import { GameStatus } from 'store/storeData';
import { selectGameStatus } from 'store/gameSlice';

type QuestionItemProps = {
  color: ItemColors;
};

export default function QuestionItem({ color }: QuestionItemProps) {
  /** типы резолвятся сами */
  const status: GameStatus = useSelector(selectGameStatus);

  return (
    <div className="colorItem">
      <div
        className="colorItemButton"
        style={{ backgroundColor: status === GameStatus.Victory ? color : 'grey' }}
      />
    </div>
  );
}

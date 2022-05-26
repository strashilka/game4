import * as React from 'react';
import ColorItem from 'views/ColorItem/ColorItem';
import CheckAnswerButton from 'views/CheckAnswerButton/CheckAnswerButton';
import { useSelector } from 'react-redux';
import { ItemColorWithId } from 'views/ColorItem/ItemColors';
import { getAnswersByRowNumber, isRowDisabled } from 'store/gameSlice';

type AnswerBoardProps = {
    row:number;
}

export default function AnswerBoard({ row }:AnswerBoardProps) {
  const answersWithIds = useSelector(getAnswersByRowNumber(row));
  const isButtonDisabled = useSelector(isRowDisabled(row));

  return (
    <div className="answerBoard">
      {answersWithIds.map((item:ItemColorWithId) => (
        <ColorItem col={item.id} row={row} key={item.id} active={!isButtonDisabled} />))}
      <CheckAnswerButton isButtonDisabled={isButtonDisabled} />
    </div>
  );
}

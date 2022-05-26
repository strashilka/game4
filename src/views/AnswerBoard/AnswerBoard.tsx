import * as React from 'react';
import ColorItem from 'views/ColorItem/ColorItem';
import CheckAnswerButton from 'views/CheckAnswerButton/CheckAnswerButton';
import { useSelector } from 'react-redux';
import { ItemColors } from 'views/ColorItem/ItemColors';
import { getAnswersByRowNumber, isRowDisabled } from 'store/gameSlice';

type AnswerBoardProps = {
    row:number;
}

export default function AnswerBoard({ row }:AnswerBoardProps) {
  const answer = useSelector(getAnswersByRowNumber(row));
  const isButtonDisabled = useSelector(isRowDisabled(row));
  // console.log(`isButtonDisabled  ${isButtonDisabled}`);

  return (
    <div className="answerBoard">
      {answer.map((item:ItemColors, index:number) => (
        // eslint-disable-next-line react/no-array-index-key
        <ColorItem col={index} row={row} key={index.toString()} active={!isButtonDisabled} />))}
      <CheckAnswerButton isButtonDisabled={isButtonDisabled} />
    </div>
  );
}

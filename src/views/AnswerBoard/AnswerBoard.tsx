import * as React from 'react';
import ColorItem from 'views/ColorItem/ColorItem';
import CheckAnswerButton from 'views/CheckAnswerButton/CheckAnswerButton';
import { isRowDisabled, selectAnswerByRow } from 'store/gameSlice';
import { useAppSelector } from 'store/store';

type AnswerBoardProps = {
  row: number;
};

export default function AnswerBoard({ row }: AnswerBoardProps) {
  // const a = useState();
  const answersWithIds = useAppSelector((state) => selectAnswerByRow(state, row));
  const isButtonDisabled = useAppSelector((state) => isRowDisabled(state, row));

  return (
    <div className="answerBoard">
      {answersWithIds.map((item) => (
        <ColorItem col={item.id} row={row} key={item.id} active={!isButtonDisabled} />
      ))}
      <CheckAnswerButton isButtonDisabled={isButtonDisabled} />
    </div>
  );
}

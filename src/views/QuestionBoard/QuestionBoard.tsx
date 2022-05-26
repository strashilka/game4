import * as React from 'react';
import QuestionItem from 'views/QuestionItem/QuestionItem';
import { useSelector } from 'react-redux';
import { GameStatus } from 'store/storeData';
import { selectGameStatus, selectQuestions } from 'store/gameSlice';
import { ItemColors } from 'views/ColorItem/ItemColors';

export default function QuestionBoard() {
  const status:GameStatus = useSelector(selectGameStatus);
  const questions:Array<ItemColors> = useSelector(selectQuestions);

  if (status === GameStatus.Idle) return <div />;

  return (
    <div className="questionBoard">
      {questions.map((color, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <QuestionItem color={color} key={index} />))}
      <div style={{ clear: 'both' }} />
    </div>
  );
}

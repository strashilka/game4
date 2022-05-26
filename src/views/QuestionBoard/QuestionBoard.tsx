import * as React from 'react';
import QuestionItem from 'views/QuestionItem/QuestionItem';
import { useSelector } from 'react-redux';
import { GameStatus } from 'store/storeData';
import { selectGameStatus, selectQuestions } from 'store/gameSlice';
import { ItemColorWithId } from 'views/ColorItem/ItemColors';

export default function QuestionBoard() {
  const status:GameStatus = useSelector(selectGameStatus);
  const questions:Array<ItemColorWithId> = useSelector(selectQuestions);

  if (status === GameStatus.Idle) return <div />;

  return (
    <div className="questionBoard">
      {questions.map((question) => (
        <QuestionItem color={question.color} key={question.id} />))}
      <div style={{ clear: 'both' }} />
    </div>
  );
}

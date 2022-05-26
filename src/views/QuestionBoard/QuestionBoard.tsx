import * as React from 'react';
import QuestionItem from 'views/QuestionItem/QuestionItem';
import { useSelector } from 'react-redux';
import { GameStatus } from 'store/storeData';
import { selectGameStatus } from 'store/gameSlice';

export default function QuestionBoard() {
  const status:GameStatus = useSelector(selectGameStatus);

  if (status === GameStatus.Idle) return <div />;

  return (
    <div className="questionBoard">
      <QuestionItem />
      <QuestionItem />
      <QuestionItem />
      <QuestionItem />
      <div style={{ clear: 'both' }} />
    </div>
  );
}

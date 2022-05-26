import * as React from 'react';
import FeedbackBoard from 'views/FeedbackBoard/FeedbackBoard';
import AnswerBoard from 'views/AnswerBoard/AnswerBoard';

type GameRowProps = {
    row:number;
}
export default function GameRow({ row }:GameRowProps) {
  return (
    <div>
      <FeedbackBoard row={row} />
      <AnswerBoard row={row} />
      <div style={{ clear: 'both' }} />
    </div>
  );
}

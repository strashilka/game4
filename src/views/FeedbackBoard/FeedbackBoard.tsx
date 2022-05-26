import * as React from 'react';
import FeedbackItem from 'views/FeedbackItem/FeedbackItem';
import { useSelector } from 'react-redux';
import { selectFeedbackByRowNumber } from 'store/gameSlice';

type FeedbackBoardProps = {
    row:number;
}

export default function FeedbackBoard({ row }:FeedbackBoardProps) {
  const feedbackByRow = useSelector(selectFeedbackByRowNumber(row));
  return (
    <div className="feedbackBoard">
      {feedbackByRow.map((feedback, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <FeedbackItem color={feedback} key={index} />
      ))}
    </div>
  );
}

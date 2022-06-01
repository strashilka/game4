import * as React from 'react';
import FeedbackItem from 'views/FeedbackItem/FeedbackItem';
import { useSelector } from 'react-redux';
import { selectFeedbackByRowNumber } from 'store/gameSlice';

type FeedbackBoardProps = {
  row: number;
};

export default function FeedbackBoard({ row }: FeedbackBoardProps) {
  const feedbackByRow = useSelector(selectFeedbackByRowNumber(row));

  return (
    <div className="feedbackBoard">
      {feedbackByRow.map((feedbackWithId) => (
        <FeedbackItem color={feedbackWithId.color} key={feedbackWithId.id} />
      ))}
    </div>
  );
}

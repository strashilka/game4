import * as React from 'react';
import FeedbackItem from 'views/FeedbackItem/FeedbackItem';
import { selectFeedbackByRow } from 'store/gameSlice';
import { useAppSelector } from 'store/store';

type FeedbackBoardProps = {
  row: number;
};

export default function FeedbackBoard({ row }: FeedbackBoardProps) {
  const feedbackByRow = useAppSelector((state) => selectFeedbackByRow(state, row));

  return (
    <div className="feedbackBoard">
      {feedbackByRow.map((feedbackWithId) => (
        <FeedbackItem color={feedbackWithId.color} key={feedbackWithId.id} />
      ))}
    </div>
  );
}

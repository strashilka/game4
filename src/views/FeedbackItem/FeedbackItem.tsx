import * as React from 'react';
import { FeedbackColors } from 'views/ColorItem/ItemColors';

type FeedbackItemProps = {
  color: FeedbackColors
}

export default function FeedbackItem({ color }:FeedbackItemProps) {
  return (
    <div
      className="feedbackItem "
      style={{ backgroundColor: { color }.color }}
    />
  );
}

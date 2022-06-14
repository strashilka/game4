import * as React from 'react';
import { checkLastRow } from 'store/gameSlice';
import { useAppDispatch } from 'store/store';

const CheckAnswerButtonStyle = {
  width: '20px',
  height: '20px',
  margin: '10px',
  Float: 'left'
};

type CheckAnswerButtonProps = {
  isButtonDisabled: boolean;
};

export default function CheckAnswerButton({ isButtonDisabled }: CheckAnswerButtonProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(checkLastRow());
  }

  return (
    <input
      style={CheckAnswerButtonStyle}
      onClick={handleClick}
      onKeyDown={handleClick}
      aria-label="Choose color"
      type="checkbox"
      disabled={!!isButtonDisabled}
      checked={!!isButtonDisabled}
      onChange={() => {}}
    />
  );
}

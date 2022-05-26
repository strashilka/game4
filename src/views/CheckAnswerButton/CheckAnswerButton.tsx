import * as React from 'react';
import { useDispatch } from 'react-redux';
import { checkLastRow } from '../../store/gameSlice';

const CheckAnswerButtonStyle = {
  width: '20px',
  height: '20px',
  margin: '10px',
  Float: 'left',
};

type CheckAnswerButtonProps = {
  isButtonDisabled:boolean
}

export default function CheckAnswerButton({ isButtonDisabled }:CheckAnswerButtonProps) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(checkLastRow());
  }

  function doNothing() {
    console.log('Do nothing');
  }
  return (
    <input
      style={CheckAnswerButtonStyle}
      onClick={handleClick}
      onKeyDown={handleClick}
      aria-label="Choose color"
      type="checkbox"
      disabled={!!isButtonDisabled}
      checked={false}
      onChange={doNothing}
    />
  );
}

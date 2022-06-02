import * as React from 'react';
import { useDispatch } from 'react-redux';
import { checkLastRow } from '../../store/gameSlice';

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
  /**
   * у тебя в store.ts есть useAppDispatch - его и нужно использовать
   */
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(checkLastRow());
  }

  /**
   * вот это непонятно зачем, если нужна пустая функция можно написать () => {} и все
   */
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
      checked={!!isButtonDisabled}
      onChange={doNothing}
    />
  );
}

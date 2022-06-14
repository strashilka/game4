import * as React from 'react';
import { ItemColors } from 'views/ColorItem/ItemColors';
import { setAnswerColor } from 'store/gameSlice';
import { useAppDispatch } from 'store/store';

type PickColorProps = {
  color: ItemColors;
};

export default function PickColor({ color }: PickColorProps) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setAnswerColor(color));
  }

  return (
    <button
      style={{ backgroundColor: { color }.color }}
      className="pickColorButton"
      onClick={handleClick}
      onKeyDown={handleClick}
      aria-label="Choose color"
      type="button"
    />
  );
}

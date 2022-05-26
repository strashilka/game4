import * as React from 'react';
import PickColor from 'views/PickColor/PickColor';
import { ItemColors } from 'views/ColorItem/ItemColors';

export default function PickColorBoard() {
  return (
    <div className="pickColorBoard">
      <PickColor color={ItemColors.Red} />
      <PickColor color={ItemColors.Green} />
      <PickColor color={ItemColors.Blue} />
      <PickColor color={ItemColors.Orange} />
      <PickColor color={ItemColors.Purple} />
      <PickColor color={ItemColors.Yellow} />
    </div>
  );
}

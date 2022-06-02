import * as React from 'react';
import PickColorBoard from 'views/PickColorBoard/PickColorBoard';
import { useDispatch, useSelector } from 'react-redux';
import { closeItem, selectItemColor, selectOpenItem, setOpenItem } from 'store/gameSlice';

type ColorItemProps = {
  col: number;
  row: number;
  active: boolean;
};

export default function ColorItem({ col, row, active }: ColorItemProps) {
  const dispatch = useDispatch();
  const openItem = useSelector(selectOpenItem);
  /**
   * параметрический селектор
   */
  const color = useSelector(selectItemColor({ x: col, y: row }));

  /**
   * Учисть писать стрелочные функции
   * const handleClick = () => { ... }
   */
  function handleClick() {
    const isPickColorBoard = openItem.x === col && openItem.y === row;
    if (!isPickColorBoard) dispatch(setOpenItem({ x: col, y: row }));
    else dispatch(closeItem());
  }

  return (
    <div className="colorItem">
      <button
        style={{ backgroundColor: color }}
        className="colorItemButton"
        onClick={handleClick}
        onKeyDown={handleClick}
        aria-label="Choose color "
        type="button"
        disabled={!active}
      />
      {openItem.x === col && openItem.y === row && <PickColorBoard />}
    </div>
  );
}

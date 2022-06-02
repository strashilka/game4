import * as React from 'react';
import ColorItem from 'views/ColorItem/ColorItem';
import CheckAnswerButton from 'views/CheckAnswerButton/CheckAnswerButton';
import { useSelector } from 'react-redux';
import { ItemColorWithId } from 'views/ColorItem/ItemColors';
import { getAnswersByRowNumber, isRowDisabled } from 'store/gameSlice';

type AnswerBoardProps = {
  row: number;
};

export default function AnswerBoard({ row }: AnswerBoardProps) {
  /*
   надо научіться писать параметрические селекторы https://stackoverflow.com/questions/40291084/use-reselect-selector-with-parameters
   в таком виде как сейчас - не работает мемоизация
   */
  const answersWithIds = useSelector(getAnswersByRowNumber(row));
  const isButtonDisabled = useSelector(isRowDisabled(row));

  return (
    <div className="answerBoard">
      {/* item: ItemColorWithId можно не писать. ТС сам разрулит. Если не разрулил значит по пути сюда что-то не так и надо искать */}
      {answersWithIds.map((item: ItemColorWithId) => (
        <ColorItem col={item.id} row={row} key={item.id} active={!isButtonDisabled} />
      ))}
      <CheckAnswerButton isButtonDisabled={isButtonDisabled} />
    </div>
  );
}

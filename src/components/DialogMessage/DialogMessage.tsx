import * as React from 'react';
import { useSelector } from 'react-redux';
import { closeMessage, selectMessage } from 'store/gameSlice';
import { useAppDispatch } from 'store/store';

export default function DialogMessage() {
  const dispatch = useAppDispatch();
  const message = useSelector(selectMessage);

  function handleClick() {
    dispatch(closeMessage());
  }

  if (message == null) {
    return null;
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <button className="close" onClick={handleClick} type="button">
          &times;
        </button>
        <h3>Important information</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

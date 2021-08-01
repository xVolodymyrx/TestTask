import React from 'react';
import styleBtn from '../Btn/Btn.module.css';

export const Btn = ({ getNextComments, nextPage }) => {
  if (nextPage === null) {
    return (
      <button className={styleBtn.disable}></button>
    )
  } else {
    return (
      <div className="btns">
        <button onClick={getNextComments} className={styleBtn.next}>Показать ещё</button>
      </div>
    )
  }
}
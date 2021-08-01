import React from "react";
import stylePagination from "../Pagination/Pagination.module.css";


export const Pagination = ({ commentsPerPage, totalComments, setCurrentPage }) => {
  const paginate = (pageNumber) => { setCurrentPage(pageNumber) };
  const pageNumers = [];

  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumers.push(i);
  }

  return (
    <div>
      <ul className={stylePagination.pagination}>
        {
          pageNumers.map(number => (
            <li className={stylePagination.pageItem} key={number} id={number} onClick={() => paginate(number)}>
              {number}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
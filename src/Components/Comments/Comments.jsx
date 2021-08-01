import React from "react";
import styleComments from "../Comments/Comments.module.css"

export const Comments = ({ comments, loading }) => {

  if (loading) {
    return <h2 className={styleComments.loading}>Loading...</h2>
  };

  return (
    <ul className={styleComments.commentsList}>
      {
        comments.map((comment, i) => (
          <li className={styleComments.listItem} key={i}>
            <div className={styleComments.authorName}>{comment.name}  :</div>
            <div className={styleComments.authorThink}>{comment.text}</div>
            <hr />
          </li>
        ))
      }
    </ul>
  )
}

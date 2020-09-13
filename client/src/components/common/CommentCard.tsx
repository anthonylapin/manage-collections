import React from "react";
import { yyyymmdd } from "../../helper/dateConverter";
import { ICommentCard } from "../../interfaces/common";

export const CommentCard: React.FC<ICommentCard> = ({ comment }) => {
  return (
    <div
      className="card mt-4 "
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div className="card-header">{comment.author}</div>
      <div className="card-body">
        <p className="card-text">{comment.text}</p>
        <hr />
        <p>
          Created:{" "}
          {yyyymmdd(comment.created ? new Date(comment.created) : new Date())}
        </p>
      </div>
    </div>
  );
};

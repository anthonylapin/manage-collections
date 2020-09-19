import React from "react";
import { ICommentCard } from "../../interfaces/common";

export const CommentCard: React.FC<ICommentCard> = ({ comment, isDark }) => {
  return (
    <div
      className={isDark ? "card mt-4 bg-dark" : "card mt-4"}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div className="card-header">{comment.author}</div>
      <div className="card-body">
        <p className="card-text">{comment.text}</p>
      </div>
      <div className="card-footer text-muted">
        {comment.created
          ? new Date(comment.created).toString()
          : new Date().toString()}
      </div>
    </div>
  );
};

import React, { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useItem } from "../../hooks/item.hooks";
import { IComment, IDetailItemPage } from "../../interfaces/common";
import { ItemCard } from "../../components/items/ItemCard";
import { AddComment } from "../../components/common/AddComment";
import io from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import { useComments } from "../../hooks/comment.hook";
import { CommentCard } from "../../components/common/CommentCard";
let socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

export const DetailItemPage: React.FC = () => {
  const itemId = useParams<IDetailItemPage>().itemId;
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { getItems, item, collection } = useItem(itemId);
  const { comments, getComments, setComments } = useComments(itemId);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const connectSocket = useCallback(() => {
    socket = io();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  useEffect(() => {
    socket.on("comment added", (addedComment: IComment) => {
      console.log(addedComment);
      setComments((prev) => [...prev, addedComment]);
    });
  }, [setComments]);

  const submitHandler = (newComment: string) => {
    let comment = {
      text: newComment,
      author: userId,
      itemId: item._id,
    };
    socket.emit("add comment", comment);
  };

  return (
    <div>
      <ItemCard item={item} collection={collection} />

      {isAuthenticated && <AddComment onSubmit={submitHandler} />}

      <div className="mt-4">
        <div className="text-center">
          <h5>Comments</h5>
        </div>
        {comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

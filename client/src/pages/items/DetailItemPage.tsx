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
import { useLikes } from "../../hooks/like.hook";
import { ThemeContext } from "styled-components";
import { darkTheme } from "../../components/themes/Themes";
import { TranslateContext } from "../../context/TranslateContext";
let socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

export const DetailItemPage: React.FC = () => {
  const itemId = useParams<IDetailItemPage>().itemId;
  const { userId, isAuthenticated } = useContext(AuthContext);
  const { getItems, item, collection } = useItem(itemId);
  const { comments, getComments, setComments } = useComments(itemId);
  const { likes, getLikes, setLikes } = useLikes(itemId);
  const isDark = useContext(ThemeContext) === darkTheme;
  const { dictionary } = useContext(TranslateContext);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  const connectSocket = useCallback(() => {
    socket = io();
    return () => {
      socket.emit("forceDisconnect");
      socket.disconnect();
      socket.close();
    };
  }, []);

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  useEffect(() => {
    socket.on("comment added", (addedComment: IComment) => {
      setComments((prev) => [...prev, addedComment]);
    });
  }, [setComments]);

  useEffect(() => {
    socket.on("like", (response: number) => {
      setLikes((prev) => prev + response);
    });
  }, [setLikes]);

  const likeHandler = () => {
    if (!isAuthenticated) {
      window.alert(dictionary.youHaveToSignInToLikePost);
      return;
    }

    const like = { userId, itemId };
    socket.emit("like", like);
  };

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
      <ItemCard
        item={item}
        collection={collection}
        onLike={likeHandler}
        likes={likes}
        isDark={isDark}
      />

      {isAuthenticated && (
        <AddComment isDark={isDark} onSubmit={submitHandler} />
      )}

      {comments.length !== 0 && (
        <div className="mt-4">
          <div className="text-center">
            <h5>{dictionary.Comments}</h5>
          </div>
          {comments.map((comment, index) => (
            <CommentCard isDark={isDark} key={index} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

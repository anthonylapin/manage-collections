import { useCallback, useState } from "react";
import { IComment } from "../interfaces/common";
import { useHttp } from "./http.hook";

export const useComments = (itemId: string) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const { request } = useHttp();

  const getComments = useCallback(async () => {
    try {
      const response = await request(`/api/comments/${itemId}`);
      setComments(response.comments);
    } catch (error) {}
  }, [request, itemId]);

  return { comments, getComments, setComments };
};

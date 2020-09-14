import { useCallback, useState } from "react";
import { useHttp } from "./http.hook";

export function useLikes(itemId: string) {
  const [likes, setLikes] = useState<number>(0);
  const { request } = useHttp();

  const getLikes = useCallback(async () => {
    try {
      const response = await request(`/api/likes/${itemId}`);
      setLikes(response.likes);
    } catch (error) {}
  }, [request, itemId]);

  return { likes, getLikes, setLikes };
}

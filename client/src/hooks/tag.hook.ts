import { useCallback, useState } from "react";
import { ITag } from "../interfaces/common";
import { useHttp } from "./http.hook";

export const useTags = (key?: boolean) => {
  const [tags, setTags] = useState<ITag[]>([]);
  const { request } = useHttp();

  const getTags = useCallback(async () => {
    try {
      let response;
      if (key) {
        response = await request("/api/tags?withId=true");
      } else {
        response = await request("/api/tags");
      }

      setTags(response.tags);
    } catch (error) {}
  }, [request, key]);

  return { tags, getTags };
};

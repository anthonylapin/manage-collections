import { useState, useCallback } from "react";
import { ITopic } from "../interfaces/common";
import { useHttp } from "./http.hook";

export const useTopics = () => {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const { request } = useHttp();

  const getTopics = useCallback(async () => {
    try {
      const fetched = await request("/api/topics/", "GET");
      setTopics(fetched.topics);
    } catch (e) {}
  }, [request]);

  return { topics, getTopics };
};

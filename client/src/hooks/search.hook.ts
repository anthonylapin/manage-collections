import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { Types } from "../reducers/reducers";
import { useHttp } from "./http.hook";

export const useSearch = () => {
  const { dispatch } = useContext(SearchContext);
  const { request, loading } = useHttp();
  const history = useHistory();

  const searchItems = async (query: string, onlyInTags?: boolean) => {
    try {
      let url = `/api/search?q=${query}`;
      if (onlyInTags) {
        url = url + `&onlyInTags=${onlyInTags}`;
      }
      const response = await request(url);
      dispatch({
        type: Types.Search,
        payload: {
          items: response.items,
          query: response.query,
        },
      });
      history.push(`/search/results`);
    } catch (error) {}
  };

  const searchItemsByTag = async (id: string | undefined) => {
    try {
      const response = await request(`/api/items?tag=${id}`);
      dispatch({
        type: Types.Search,
        payload: {
          items: response.items,
          query: response.query,
        },
      });
      history.push(`/search/results`);
    } catch (error) {}
  };

  return { searchItems, searchItemsByTag, loading };
};

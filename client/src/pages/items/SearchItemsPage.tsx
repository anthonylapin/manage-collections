import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { darkTheme } from "../../components/themes/Themes";
import { SearchContext } from "../../context/SearchContext";

export const SearchItemsPage: React.FC = () => {
  const { state } = useContext(SearchContext);
  const history = useHistory();
  const isDark = useContext(ThemeContext) === darkTheme;

  if (!state.query) {
    history.push("/");
  }

  const foundResults = () => {
    return state.items.map((item, index) => (
      <li
        key={index}
        className={isDark ? "list-group-item bg-dark" : "list-group-item"}
      >
        <Link to={`/item/detail/${item._id}`}>{item.name}</Link>
      </li>
    ));
  };

  return (
    <div className="text-center">
      <h5 className="mb-4">Results matching query: {state.query}</h5>
      <ul className="list-group">{foundResults()}</ul>
    </div>
  );
};

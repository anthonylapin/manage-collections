import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import { useHttp } from "../../hooks/http.hook";
import { INavbarProps } from "../../interfaces/common";
import { Types } from "../../reducers/reducers";
import { SearchForm } from "./SearchForm";

export const Navbar: React.FC<INavbarProps> = ({ isAuthenticated }) => {
  const auth = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);
  const { request, loading } = useHttp();
  const history = useHistory();

  const searchItems = async (query: string) => {
    try {
      const response = await request(`/api/search?q=${query}`);
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

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    auth.logout();
  };

  const getNavItems = () => {
    if (isAuthenticated) {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/manage/collections">
              My collections
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={logoutHandler} className="nav-link" to="/">
              Logout
            </NavLink>
          </li>
        </ul>
      );
    }
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <NavLink className="nav-link" to="/signin">
            Sign in
          </NavLink>
        </li>
        <li className="nav-item active">
          <NavLink className="nav-link" to="/signup">
            Sign up<span className="sr-only">(current)</span>
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        ManageCollections
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {getNavItems()}
        <SearchForm onSearch={searchItems} loading={loading} />
      </div>
    </nav>
  );
};

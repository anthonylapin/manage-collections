import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { TranslateContext } from "../../context/TranslateContext";
import { useSearch } from "../../hooks/search.hook";
import { INavbarProps } from "../../interfaces/common";
import { Locales } from "../../locale/locales";
import { darkTheme } from "../themes/Themes";
import { SearchForm } from "./SearchForm";

export const Navbar: React.FC<INavbarProps> = ({
  isAuthenticated,
  onThemeToggle,
  onLocaleToggle,
}) => {
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const isDark = theme === darkTheme;
  const { searchItems, loading } = useSearch();
  const { dictionary } = useContext(TranslateContext);

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    auth.logout();
  };

  const getNavItems = () => {
    if (isAuthenticated) {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/manage/collections">
              {dictionary.myCollections}
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li
            onClick={onThemeToggle}
            style={{ cursor: "pointer" }}
            className="nav-item active"
          >
            <NavLink className="nav-link disabled" to="">
              {dictionary.theme}
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {dictionary.language}
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <div
                onClick={() => {
                  onLocaleToggle(Locales.English);
                }}
                style={{ cursor: "pointer" }}
                className="dropdown-item"
              >
                {dictionary.english}
              </div>
              <div
                onClick={() => {
                  onLocaleToggle(Locales.Russian);
                }}
                style={{ cursor: "pointer" }}
                className="dropdown-item"
              >
                {dictionary.russian}
              </div>
            </div>
          </li>
          <li className="nav-item">
            <NavLink onClick={logoutHandler} className="nav-link" to="/">
              {dictionary.logout}
            </NavLink>
          </li>
        </ul>
      );
    }
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <NavLink className="nav-link" to="/signin">
            {dictionary.signIn}
          </NavLink>
        </li>
        <li className="nav-item active">
          <NavLink className="nav-link" to="/signup">
            {dictionary.signUp}
            <span className="sr-only">(current)</span>
          </NavLink>
        </li>
        <li
          onClick={onThemeToggle}
          style={{ cursor: "pointer" }}
          className="nav-item active"
        >
          <NavLink className="nav-link disabled" to="">
            {dictionary.theme}
            <span className="sr-only">(current)</span>
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <NavLink
            className="nav-link dropdown-toggle"
            to="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {dictionary.language}
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div
              onClick={() => {
                onLocaleToggle(Locales.English);
              }}
              style={{ cursor: "pointer" }}
              className="dropdown-item"
            >
              {dictionary.english}
            </div>
            <div
              onClick={() => {
                onLocaleToggle(Locales.Russian);
              }}
              style={{ cursor: "pointer" }}
              className="dropdown-item"
            >
              {dictionary.russian}
            </div>
          </div>
        </li>
      </ul>
    );
  };

  return (
    <nav
      className={
        isDark
          ? "navbar navbar-expand-lg navbar-dark bg-dark"
          : "navbar navbar-expand-lg navbar-dark bg-primary"
      }
    >
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

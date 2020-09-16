import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { INavbarProps } from "../../interfaces/common";
import { SearchForm } from "./SearchForm";

export const Navbar: React.FC<INavbarProps> = ({ isAuthenticated }) => {
  const auth = useContext(AuthContext);

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    auth.logout();
  };

  const getNavItems = () => {
    if (isAuthenticated) {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Main page
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
        <SearchForm />
      </div>
    </nav>
  );
};

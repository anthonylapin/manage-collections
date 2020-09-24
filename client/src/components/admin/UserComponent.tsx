import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import { yyyymmdd } from "../../helper/dateConverter";
import { IUserComponent } from "../../interfaces/common";
import { darkTheme } from "../themes/Themes";

export const UserComponent: React.FC<IUserComponent> = ({ user }) => {
  const isDark = useContext(ThemeContext) === darkTheme;
  const { dictionary } = useContext(TranslateContext);
  return (
    <div className={isDark ? "card bg-dark" : "card"}>
      <div className="card-header">{`${user.firstName} ${user.lastName}`}</div>
      <ul
        className={
          isDark
            ? "list-group list-group-flush bg-dark"
            : "list-group list-group-flush"
        }
      >
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {dictionary.emailAddress}: {user.email}
        </li>
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {dictionary.Blocked}: {String(user.blocked)}
        </li>
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {dictionary.Superuser}: {String(user.superuser)}
        </li>
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {dictionary.Created}: {yyyymmdd(new Date(user.created))}
        </li>
      </ul>
    </div>
  );
};

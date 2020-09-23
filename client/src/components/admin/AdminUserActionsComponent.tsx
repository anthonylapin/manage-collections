import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import { IUser } from "../../interfaces/common";
import { SelectForm } from "../common/SelectForm";
import { darkTheme } from "../themes/Themes";

interface IUserActions {
  users: IUser[];
  onSubmit: (userId: string, action: string) => void;
}

const userActions = [
  {
    _id: "BLOCK",
    name: "Block",
  },
  {
    _id: "UNBLOCK",
    name: "Unblock",
  },
  {
    _id: "DELETE",
    name: "Delete",
  },
  {
    _id: "ADMIN",
    name: "Make admin",
  },
];

export const AdminUserActionsComponent: React.FC<IUserActions> = ({
  users,
  onSubmit,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const isDark = useContext(ThemeContext) === darkTheme;
  const formik = useFormik({
    initialValues: {
      userId: users[0]._id,
      action: userActions[0]._id,
    },
    onSubmit: (values) => {
      onSubmit(values.userId, values.action);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="selectItem">
          {dictionary.Select} {dictionary.user}
        </label>
        <select
          className="form-control"
          id="userId"
          value={formik.values.userId}
          onChange={formik.handleChange}
        >
          <option value="default value" disabled>
            {dictionary.Select} {dictionary.user}
          </option>
          {users.map((item, index) => (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="selectItem">
          {dictionary.Select} {dictionary.action}
        </label>
        <select
          className="form-control"
          id="action"
          value={formik.values.action}
          onChange={formik.handleChange}
        >
          <option value="default value" disabled>
            {dictionary.Select} {dictionary.action}
          </option>
          {userActions.map((item, index) => (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
      >
        {formik.values.action}
      </button>
    </form>
  );
};

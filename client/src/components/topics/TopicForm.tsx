import { useFormik } from "formik";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import { darkTheme } from "../themes/Themes";

interface ITopicForm {
  initialName?: string;
  topicId?: string;
  action: string;
  onSubmit: (action: string, name: string, topicId?: string) => void;
}

export const TopicForm: React.FC<ITopicForm> = ({
  onSubmit,
  initialName,
  action,
  topicId,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const isDark = useContext(ThemeContext) === darkTheme;
  const formik = useFormik({
    initialValues: {
      name: initialName ? initialName : "",
    },
    onSubmit: (values) => {
      if (topicId) {
        onSubmit(action, values.name, topicId);
        return;
      }
      onSubmit(action, values.name);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">{dictionary.Name}</label>
        <input
          id="name"
          className="form-control"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <button
        className={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
        type="submit"
      >
        {action}
      </button>
    </form>
  );
};

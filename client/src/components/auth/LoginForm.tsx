import React, { useContext } from "react";
import { useFormik } from "formik";
import { ILoginForm } from "../../interfaces/common";
import { TranslateContext } from "../../context/TranslateContext";

export const LoginForm: React.FC<ILoginForm> = ({
  loading,
  onLogin,
  isDark,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      onLogin(values.email, values.password);
    },
  });

  const { dictionary } = useContext(TranslateContext);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">{dictionary.emailAddress}</label>
        <input
          id="email"
          className="form-control"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">{dictionary.Password}</label>
        <input
          id="password"
          className="form-control"
          name="password"
          type="password"
          autoComplete="on"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className={isDark ? "btn btn-outline-success" : "btn btn-success"}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {dictionary.signIn}
        </button>
      </div>
    </form>
  );
};

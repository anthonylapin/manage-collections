import React, { useContext } from "react";
import { useFormik } from "formik";
import { IRegisterForm } from "../../interfaces/common";
import { TranslateContext } from "../../context/TranslateContext";

export const RegisterForm: React.FC<IRegisterForm> = ({
  loading,
  onRegister,
  isDark,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      onRegister(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
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
      <div className="row form-group">
        <div className="col">
          <label htmlFor="firstName">{dictionary.firstName}</label>
          <input
            id="firstName"
            className="form-control"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
        </div>
        <div className="col">
          <label htmlFor="lastName">{dictionary.lastName}</label>
          <input
            id="lastName"
            className="form-control"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
        </div>
      </div>
      <div className="text-center">
        <button
          className={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
          disabled={loading}
          type="submit"
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {dictionary.signUp}
        </button>
      </div>
    </form>
  );
};

import { useFormik } from "formik";
import React, { useContext } from "react";
import { TranslateContext } from "../../context/TranslateContext";
import { ISearchForm } from "../../interfaces/common";

export const SearchForm: React.FC<ISearchForm> = ({ onSearch, loading }) => {
  const { dictionary } = useContext(TranslateContext);
  const formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: (values) => {
      onSearch(values.query);
      formik.setValues({ query: "" });
    },
  });

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={formik.handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder={dictionary.search}
        aria-label="Search"
        name="query"
        value={formik.values.query}
        onChange={formik.handleChange}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        {dictionary.search}
        {loading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
      </button>
    </form>
  );
};

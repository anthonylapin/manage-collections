import { useFormik } from "formik";
import React from "react";

export const SearchForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: (values) => {
      console.log(values.query);
      formik.setValues({ query: "" });
    },
  });

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={formik.handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        name="query"
        value={formik.values.query}
        onChange={formik.handleChange}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

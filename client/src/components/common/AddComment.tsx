import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { IAddComment } from "../../interfaces/common";
import { TranslateContext } from "../../context/TranslateContext";

export const AddComment: React.FC<IAddComment> = ({ onSubmit, isDark }) => {
  const [showAlert, setShowAlert] = useState(false);
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      if (values.comment) {
        setShowAlert(false);
        onSubmit(values.comment);
        formik.setValues({ comment: "" });
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    },
  });

  const { dictionary } = useContext(TranslateContext);

  return (
    <div className="mt-5">
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          {dictionary.commentMustBeNonEmpty}
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="addComment">{dictionary.addComment}</label>
          <input
            type="text"
            className="form-control"
            id="addComment"
            name="comment"
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
        </div>
        <button
          type="submit"
          className={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
        >
          {dictionary.addComment}
        </button>
      </form>
    </div>
  );
};

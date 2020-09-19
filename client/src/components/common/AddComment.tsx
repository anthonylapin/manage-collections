import React, { useState } from "react";
import { useFormik } from "formik";
import { IAddComment } from "../../interfaces/common";

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

  return (
    <div className="mt-5">
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          Comment must be non-empty.
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="addComment">Add comment</label>
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
          Add comment
        </button>
      </form>
    </div>
  );
};

import React from "react";
import { ISelectForm } from "../../interfaces/common";
import { useFormik } from "formik";

export const SelectForm: React.FC<ISelectForm> = ({
  items,
  onSelect,
  buttonAction,
  buttonClass,
  target,
}) => {
  const formik = useFormik({
    initialValues: {
      item: "default value",
    },
    onSubmit: (values) => {
      onSelect(values.item);
    },
  });

  if (!items.length) {
    return (
      <div className="text-center">
        <h5>
          No {target} to {buttonAction}
        </h5>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="selectItem">Select {target}</label>
        <select
          className="form-control"
          id="item"
          value={formik.values.item}
          onChange={formik.handleChange}
        >
          <option value="default value" disabled>
            Select {target}
          </option>
          {items.map((item, index) => (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={buttonClass}>
        {`${buttonAction} ${target}`}
      </button>
    </form>
  );
};

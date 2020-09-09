import React from "react";
import { ISelectItem } from "../../interfaces/common";
import { useFormik } from "formik";

export const SelectItemForm: React.FC<ISelectItem> = ({
  items,
  onSelect,
  buttonName,
  buttonClass,
}) => {
  const formik = useFormik({
    initialValues: {
      item: "default value",
    },
    onSubmit: (values) => {
      onSelect(values.item);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="selectItem">Select item</label>
        <select
          className="form-control"
          id="item"
          value={formik.values.item}
          onChange={formik.handleChange}
        >
          <option value="default value" disabled>
            Select item
          </option>
          {items.map((item, index) => (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={buttonClass}>
        {buttonName}
      </button>
    </form>
  );
};

import React, { useContext } from "react";
import { TranslateContext } from "../../context/TranslateContext";
import { IItemsFilterBy } from "../../interfaces/common";

export const ItemsFilterByComponent: React.FC<IItemsFilterBy> = ({
  onChange,
}) => {
  const handleChange = (e: any) => {
    onChange(e.target.name, e.target.value);
  };

  const { dictionary } = useContext(TranslateContext);

  return (
    <div className="col">
      <div className="text-center">
        <h6>{dictionary.filterBy}</h6>
      </div>
      <div className="row">
        <div className="col form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Tags"
            name="tags"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

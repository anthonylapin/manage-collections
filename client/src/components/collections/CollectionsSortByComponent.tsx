import React, { useState } from "react";
import { ICollectionsSortBy } from "../../interfaces/common";

enum sortKeys {
  Name = "NAME",
  DateCreated = "DATE_CREATED",
  Size = "SIZE",
  Default = "DEFAULT",
}

export const CollectionSortByComponent: React.FC<ICollectionsSortBy> = ({
  onChange,
}) => {
  const [key, setKey] = useState(sortKeys.Default);
  const handleChange = (e: any) => {
    setKey(e.target.value);
    onChange(e.target.value);
  };
  return (
    <div className="col">
      <h6>Sort by</h6>
      <div className="form-group">
        <select
          className="form-control"
          id="sort-by-select"
          onChange={handleChange}
          value={key}
        >
          <option value={sortKeys.Default}>Default</option>
          <option value={sortKeys.Name}>Name</option>
          <option value={sortKeys.DateCreated}>Date created</option>
          <option value={sortKeys.Size}>Size</option>
        </select>
      </div>
    </div>
  );
};

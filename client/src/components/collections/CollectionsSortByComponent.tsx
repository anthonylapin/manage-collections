import React, { useContext, useState } from "react";
import { TranslateContext } from "../../context/TranslateContext";
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
  const { dictionary } = useContext(TranslateContext);
  return (
    <div className="col">
      <h6>{dictionary.sortBy}</h6>
      <div className="form-group">
        <select
          className="form-control"
          id="sort-by-select"
          onChange={handleChange}
          value={key}
        >
          <option value={sortKeys.Default}>{dictionary.Default}</option>
          <option value={sortKeys.Name}>{dictionary.Name}</option>
          <option value={sortKeys.DateCreated}>{dictionary.dateCreated}</option>
          <option value={sortKeys.Size}>{dictionary.Size}</option>
        </select>
      </div>
    </div>
  );
};

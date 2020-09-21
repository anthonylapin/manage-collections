import React, { useContext } from "react";
import { TranslateContext } from "../../context/TranslateContext";
import { IItemsSortBy } from "../../interfaces/common";

enum sortKeys {
  Default = "DEFAULT",
  Name = "NAME",
  DateCreated = "DATE_CREATED",
  Tags = "TAGS",
  Comments = "COMMENTS",
  Likes = "LIKES",
}

export const ItemsSortByComponent: React.FC<IItemsSortBy> = ({ onChange }) => {
  const { dictionary } = useContext(TranslateContext);
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <div className="col">
      <div className="text-center">
        <h6>{dictionary.sortBy}</h6>
      </div>
      <div className="form-group">
        <select
          className="form-control"
          id="sort-by-select"
          onChange={handleChange}
        >
          <option value={sortKeys.Default}>{dictionary.Default}</option>
          <option value={sortKeys.Name}>{dictionary.Name}</option>
          <option value={sortKeys.DateCreated}>{dictionary.dateCreated}</option>
          <option value={sortKeys.Tags}>{dictionary.Tags}</option>
          <option value={sortKeys.Comments}>{dictionary.Comments}</option>
          <option value={sortKeys.Likes}>{dictionary.Likes}</option>
        </select>
      </div>
    </div>
  );
};

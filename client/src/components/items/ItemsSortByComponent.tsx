import React from "react";
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
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <div className="col">
      <div className="text-center">
        <h6>Sort by</h6>
      </div>
      <div className="form-group">
        <select
          className="form-control"
          id="sort-by-select"
          onChange={handleChange}
        >
          <option value={sortKeys.Default}>Default</option>
          <option value={sortKeys.Name}>Name</option>
          <option value={sortKeys.DateCreated}>Date created</option>
          <option value={sortKeys.Tags}>Tags</option>
          <option value={sortKeys.Comments}>Comments</option>
          <option value={sortKeys.Likes}>Likes</option>
        </select>
      </div>
    </div>
  );
};

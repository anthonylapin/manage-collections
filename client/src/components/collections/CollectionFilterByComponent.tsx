import React from "react";

export const CollectionFilterByComponent: React.FC = () => {
  return (
    <div className="col">
      <h6>Filter by</h6>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="filter-by-name"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

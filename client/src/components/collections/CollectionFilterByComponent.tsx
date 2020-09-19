import React, { useState } from "react";
import { ICollectionsFilterBy } from "../../interfaces/common";

export const CollectionFilterByComponent: React.FC<ICollectionsFilterBy> = ({
  onChange,
  topics,
}) => {
  const [selectedTopic, setSelectedTopic] = useState("default");

  const handleChange = (e: any) => {
    if (e.target.name === "topic") {
      setSelectedTopic(e.target.value);
    }
    onChange(e.target.name, e.target.value);
  };

  const getOptions = () => {
    return topics.map((topic, index) => (
      <option key={index} value={topic.id}>
        {topic.name}
      </option>
    ));
  };

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
              name="name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <select
            className="form-control"
            name="topic"
            value={selectedTopic}
            onChange={handleChange}
          >
            <option value="default">Default</option>
            {getOptions()}
          </select>
        </div>
      </div>
    </div>
  );
};

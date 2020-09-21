import React, { useContext, useState } from "react";
import { TranslateContext } from "../../context/TranslateContext";
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

  const { dictionary } = useContext(TranslateContext);

  return (
    <div className="col">
      <h6>{dictionary.filterBy}</h6>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="filter-by-name"
              placeholder={dictionary.Name}
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
            <option value="default">{dictionary.Default}</option>
            {getOptions()}
          </select>
        </div>
      </div>
    </div>
  );
};

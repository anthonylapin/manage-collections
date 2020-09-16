import React from "react";
import { ISelectTopicForm } from "../../interfaces/common";

export const SelectTopicForm: React.FC<ISelectTopicForm> = ({
  onChange,
  value,
  getOptions,
}) => {
  return (
    <div className="form-group">
      <label htmlFor="topic">Topic</label>
      <select
        className="form-control"
        id="topic"
        onChange={onChange}
        value={value}
      >
        {getOptions()}
      </select>
    </div>
  );
};

import React, { useContext } from "react";
import { TranslateContext } from "../../context/TranslateContext";
import { ISelectTopicForm } from "../../interfaces/common";

export const SelectTopicForm: React.FC<ISelectTopicForm> = ({
  onChange,
  value,
  getOptions,
}) => {
  const { dictionary } = useContext(TranslateContext);
  return (
    <div className="form-group">
      <label htmlFor="topic">{dictionary.Topic}</label>
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

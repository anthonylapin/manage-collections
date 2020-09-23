import React from "react";
import { ITopic } from "../../interfaces/common";
import { SelectForm } from "../common/SelectForm";

interface IDeleteTopic {
  topics: ITopic[];
  onSubmit: (action: string, name: string, topicId: string) => void;
}

const Action = "DELETE";

export const DeleteTopicComponent: React.FC<IDeleteTopic> = ({
  topics,
  onSubmit,
}) => {
  const selectHandler = (selectedId: string) => {
    const topicName = topics.find((topic) => topic.id === selectedId)?.name;
    if (topicName) {
      onSubmit(Action, topicName, selectedId);
    }
  };

  return (
    <div>
      <SelectForm
        items={topics.map((topic) => ({ _id: topic.id, name: topic.name }))}
        onSelect={selectHandler}
        buttonAction="Delete"
        buttonClass={"btn btn-danger"}
        target="topic"
      />
    </div>
  );
};

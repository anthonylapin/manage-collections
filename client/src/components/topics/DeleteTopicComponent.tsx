import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import { ITopic } from "../../interfaces/common";
import { SelectForm } from "../common/SelectForm";
import { darkTheme } from "../themes/Themes";

interface IDeleteTopic {
  topics: ITopic[];
  onSubmit: (action: string, name: string, topicId: string) => void;
}

const Action = "DELETE";

export const DeleteTopicComponent: React.FC<IDeleteTopic> = ({
  topics,
  onSubmit,
}) => {
  const isDark = useContext(ThemeContext) === darkTheme;
  const { dictionary } = useContext(TranslateContext);
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
        buttonAction={dictionary.Delete}
        buttonClass={isDark ? "btn btn-outline-danger" : "btn btn-danger"}
        target={dictionary.topicPrescriptiveCase}
      />
    </div>
  );
};

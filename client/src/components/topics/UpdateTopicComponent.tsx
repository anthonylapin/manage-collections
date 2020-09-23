import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import { ITopic } from "../../interfaces/common";
import { SelectForm } from "../common/SelectForm";
import { darkTheme } from "../themes/Themes";
import { TopicForm } from "./TopicForm";

interface IDeleteTopic {
  topics: ITopic[];
  onSubmit: (action: string, name?: string, topicId?: string) => void;
}

const Action = "UPDATE";

export const UpdateTopicComponent: React.FC<IDeleteTopic> = ({
  topics,
  onSubmit,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const isDark = useContext(ThemeContext) === darkTheme;
  const [topic, setTopic] = useState<ITopic | undefined>(undefined);
  const selectHandler = (selectedId: string) => {
    const selectedTopic = topics.find((topic) => topic.id === selectedId);
    setTopic(selectedTopic);
  };

  return (
    <div>
      {topic === undefined && (
        <SelectForm
          items={topics.map((topic) => ({ _id: topic.id, name: topic.name }))}
          onSelect={selectHandler}
          buttonAction={dictionary.Update}
          buttonClass={isDark ? "btn btn-outline-info" : "btn btn-info"}
          target={dictionary.topic}
        />
      )}
      {topic && (
        <TopicForm
          action={Action}
          onSubmit={onSubmit}
          initialName={topic.name}
          topicId={topic.id}
        />
      )}
    </div>
  );
};

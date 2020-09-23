import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import { ITopic } from "../../interfaces/common";
import { darkTheme } from "../themes/Themes";
import { TopicForm } from "../topics/TopicForm";
import { DeleteTopicComponent } from "../topics/DeleteTopicComponent";
import { UpdateTopicComponent } from "../topics/UpdateTopicComponent";

interface IAdminTopicActions {
  onSubmit: (action: string, topicId?: string, name?: string) => void;
  topics: ITopic[];
}

enum topicActions {
  Delete = "DELETE",
  Create = "CREATE",
  Update = "UPDATE",
}

export const AdminTopicActionsComponent: React.FC<IAdminTopicActions> = ({
  onSubmit,
  topics,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const isDark = useContext(ThemeContext) === darkTheme;
  const [action, setAction] = useState("");

  const handleActionSelect = (e: any) => {
    setAction(e.target.value);
  };

  const renderAction = () => {
    switch (action) {
      case topicActions.Create:
        return <TopicForm action={action} onSubmit={onSubmit} />;
      case topicActions.Delete:
        return <DeleteTopicComponent topics={topics} onSubmit={onSubmit} />;
      case topicActions.Update:
        return <UpdateTopicComponent topics={topics} onSubmit={onSubmit} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="text-center">
      {!action && (
        <div>
          <h5>{dictionary.topicActions}</h5>
          <button
            type="submit"
            className={
              isDark
                ? "btn btn-outline-primary btn-block"
                : "btn btn-primary btn-block"
            }
            value={topicActions.Create}
            onClick={handleActionSelect}
          >
            {dictionary.createTopic}
          </button>
          <button
            type="submit"
            className={
              isDark
                ? "btn btn-outline-secondary btn-block"
                : "btn btn-secondary btn-block"
            }
            value={topicActions.Update}
            onClick={handleActionSelect}
          >
            {dictionary.updateTopic}
          </button>
          <button
            type="submit"
            className={
              isDark
                ? "btn btn-outline-danger btn-block"
                : "btn btn-danger btn-block"
            }
            value={topicActions.Delete}
            onClick={handleActionSelect}
          >
            {dictionary.deleteTopic}
          </button>
        </div>
      )}
      {renderAction()}
    </div>
  );
};

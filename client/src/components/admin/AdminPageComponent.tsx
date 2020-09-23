import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import {
  ICreateCollectionValues,
  ITopic,
  IUser,
} from "../../interfaces/common";
import { darkTheme } from "../themes/Themes";
import { AdminCreateCollection } from "./AdminCreateCollectionComponent";
import { AdminTopicActionsComponent } from "./AdminTopicActionsComponent";
import { AdminUserActionsComponent } from "./AdminUserActionsComponent";

interface IAdminPageComponent {
  users: IUser[];
  topics: ITopic[];
  submitUserAction: (
    userId: string,
    userAction: string,
    values?: ICreateCollectionValues
  ) => void;
  submitTopicAction: (action: string, topicId?: string, name?: string) => void;
}

export const AdminPageComponent: React.FC<IAdminPageComponent> = ({
  users,
  submitUserAction,
  submitTopicAction,
  topics,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const isDark = useContext(ThemeContext) === darkTheme;
  const [action, setAction] = useState("none");
  const [createCollectionData, setCreateCollectionData] = useState({
    show: false,
    userId: "",
    action: "",
  });

  const selectActionHandler = (e: any) => {
    setAction(e.target.value);
  };

  const submitUserActionHandler = (
    selectedUserId: string,
    userAction: string
  ) => {
    if (userAction === "CREATE") {
      setCreateCollectionData({
        show: true,
        userId: selectedUserId,
        action: userAction,
      });
      return;
    }

    submitUserAction(selectedUserId, userAction);
  };

  return (
    <div className="text-center">
      <h4 className="mb-4">{dictionary.adminPanel}</h4>
      {action === "none" && (
        <div id="selectAction">
          <button
            className={
              isDark
                ? "btn btn-outline-primary btn-block"
                : "btn btn-primary btn-block"
            }
            name="user"
            value="user"
            onClick={selectActionHandler}
          >
            {dictionary.userActions}
          </button>
          <button
            className={
              isDark
                ? "btn btn-outline-info btn-block"
                : "btn btn-info btn-block"
            }
            name="topic"
            value="topic"
            onClick={selectActionHandler}
          >
            {dictionary.topicActions}
          </button>
        </div>
      )}
      {action === "user" && (
        <AdminUserActionsComponent
          users={users}
          onSubmit={submitUserActionHandler}
        />
      )}
      {action === "topic" && (
        <AdminTopicActionsComponent
          onSubmit={submitTopicAction}
          topics={topics}
        />
      )}
      {createCollectionData.show && (
        <AdminCreateCollection
          action={createCollectionData.action}
          userId={createCollectionData.userId}
          topics={topics}
          onSubmit={submitUserAction}
        />
      )}
    </div>
  );
};

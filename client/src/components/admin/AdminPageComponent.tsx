import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import { IAdminPageComponent, IUser } from "../../interfaces/common";
import { darkTheme } from "../themes/Themes";
import { AdminCreateCollection } from "./AdminCreateCollectionComponent";
import { AdminTopicActionsComponent } from "./AdminTopicActionsComponent";
import { AdminUserActionsComponent } from "./AdminUserActionsComponent";
import { UserComponent } from "./UserComponent";

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
  const [userForm, setUserForm] = useState({
    data: {} as IUser,
    show: false,
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

    if (userAction === "SHOW") {
      const user = users.find((user) => user._id === selectedUserId);

      if (user) {
        setUserForm({
          show: true,
          data: user,
        });
      }
      window.alert(dictionary.userDataIsShownBelow);
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
      {userForm.show && (
        <div className="mt-4">
          <UserComponent user={userForm.data} />
        </div>
      )}
    </div>
  );
};

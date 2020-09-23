import React, { useEffect } from "react";
import { AdminPageComponent } from "../../components/admin/AdminPageComponent";
import { useAdmin } from "../../hooks/admin.hook";
import { useTopics } from "../../hooks/topic.hook";

export const AdminPage: React.FC = () => {
  const {
    users,
    getUsers,
    updateUser,
    deleteUser,
    createTopic,
    updateTopic,
    deleteTopic,
  } = useAdmin();

  const { topics, getTopics } = useTopics();

  useEffect(() => {
    getUsers();
    getTopics();
  }, [getUsers, getTopics]);

  const submitUserAction = async (userId: string, userAction: string) => {
    if (userAction === "DELETE") {
      await deleteUser(userId);
      return;
    }
    await updateUser(userId, userAction);
  };

  const submitTopicAction = async (
    action: string,
    name?: string,
    topicId?: string
  ) => {
    switch (action) {
      case "CREATE":
        if (name) {
          console.log("We are here");
          await createTopic(name);
        }
        break;
      case "UPDATE":
        if (name && topicId) {
          await updateTopic(topicId, name);
        }
        break;
      case "DELETE":
        if (topicId) {
          await deleteTopic(topicId);
        }
        break;
      default:
        console.log("some error...");
        break;
    }
  };

  return (
    <div>
      <AdminPageComponent
        users={users}
        topics={topics}
        submitUserAction={submitUserAction}
        submitTopicAction={submitTopicAction}
      />
    </div>
  );
};

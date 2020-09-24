import React, { useEffect } from "react";
import { AdminPageComponent } from "../../components/admin/AdminPageComponent";
import { Loader } from "../../components/common/Loader";
import { useAdmin } from "../../hooks/admin.hook";
import { useTopics } from "../../hooks/topic.hook";
import { ICreateCollectionValues } from "../../interfaces/common";

export const AdminPage: React.FC = () => {
  const {
    users,
    getUsers,
    updateUser,
    deleteUser,
    createTopic,
    updateTopic,
    deleteTopic,
    createCollection,
    loading,
  } = useAdmin();
  const { topics, getTopics } = useTopics();

  useEffect(() => {
    getUsers();
    getTopics();
  }, [getUsers, getTopics]);

  const submitUserAction = async (
    userId: string,
    action: string,
    values?: ICreateCollectionValues
  ) => {
    switch (action) {
      case "DELETE":
        await deleteUser(userId);
        break;
      case "CREATE":
        values && (await createCollection(values, userId, topics));
        break;
      default:
        await updateUser(userId, action);
        break;
    }
    await getUsers();
  };

  const submitTopicAction = async (
    action: string,
    name?: string,
    topicId?: string
  ) => {
    switch (action) {
      case "CREATE":
        if (name) {
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
    await getTopics();
  };

  if (loading) {
    return <Loader />;
  }

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

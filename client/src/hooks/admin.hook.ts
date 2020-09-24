import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadFileToGoogleStorage } from "../helper/uploadFileToGoogleStorage";
import { ICreateCollectionValues, ITopic, IUser } from "../interfaces/common";
import { useHttp } from "./http.hook";

export const useAdmin = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { request, loading, setLoading } = useHttp();
  const auth = useContext(AuthContext);

  const getUsers = useCallback(async () => {
    try {
      const response = await request("/api/admin/users");
      setUsers(response.users);
    } catch (error) {
      window.alert(error.message);
    }
  }, [request]);

  const updateUser = async (userId: string, action: string) => {
    try {
      const response = await request(
        `/api/admin/users/${userId}?action=${action}`,
        "PUT",
        null,
        {}
      );

      window.alert(response.message);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await request(
        `/api/admin/users/${userId}`,
        "DELETE",
        null,
        {}
      );

      window.alert(response.message);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const createTopic = async (name: string) => {
    try {
      const response = await request("/api/admin/topics", "POST", { name }, {});
      window.alert(response.message);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const updateTopic = async (topicId: string, name: string) => {
    try {
      const response = await request(
        `/api/admin/topics/${topicId}`,
        "PUT",
        { name },
        {}
      );
      window.alert(response.message);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const deleteTopic = async (topicId: string) => {
    try {
      const response = await request(`/api/admin/topics/${topicId}`, "DELETE");
      window.alert(response.message);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const createCollection = async (
    values: ICreateCollectionValues,
    userId: string,
    topics: ITopic[]
  ) => {
    setLoading(true);
    let imageUrl = await uploadFileToGoogleStorage(values.file);
    setLoading(false);

    values["imageUrl"] = imageUrl;
    delete values["file"];

    if (!values.topic) {
      values.topic = topics[0].id;
    }

    try {
      let url = `/api/collections/create?userId=${userId}`;
      const response = await request(url, "POST", values, {
        Authorization: `Bearer ${auth.token}`,
      });
      window.alert(response.message);
    } catch (e) {
      window.alert(e.message);
    }
  };

  return {
    users,
    getUsers,
    updateUser,
    deleteUser,
    createTopic,
    updateTopic,
    deleteTopic,
    createCollection,
    loading,
  };
};

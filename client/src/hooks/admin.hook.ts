import { useCallback, useState } from "react";
import { IUser } from "../interfaces/common";
import { useHttp } from "./http.hook";

export const useAdmin = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { request } = useHttp();

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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const createTopic = async (name: string) => {
    try {
      const response = await request("/api/admin/topics", "POST", { name }, {});
      window.alert(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const deleteTopic = async (topicId: string) => {
    try {
      const response = await request(`/api/admin/topics/${topicId}`, "DELETE");
      window.alert(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      window.alert(error.message);
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
  };
};

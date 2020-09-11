import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "./http.hook";
import { ICreateItemForm, ICollection } from "../interfaces/common";

export const useCollections = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [collections, setCollections] = useState<ICollection[]>([]);

  const getCollections = useCallback(async () => {
    try {
      let response = await request("/api/collections", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setCollections(response.collections);
    } catch (e) {}
  }, [request, token]);

  return { collections, getCollections };
};

export const useCollection = (collectionId: string) => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [itemForm, setItemForm] = useState<ICreateItemForm>({
    existingTags: [],
  });
  const [collection, setCollection] = useState<ICollection>({
    name: "",
    owner: "",
    description: "",
    topic: "",
    imageUrl: "",
    created: new Date(),
  });
  const [collectionExists, setCollectionExists] = useState(true);

  const getItemForm = useCallback(async () => {
    try {
      let response = await request(
        `/api/collections/${collectionId}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );
      const collectionInfo = response.collection;

      response = await request("/api/tags", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      const existingTags = response.tags;

      setItemForm((prev) => ({
        existingTags: existingTags,
        numericFieldKey1: collectionInfo.numericField1,
        numericFieldKey2: collectionInfo.numericField2,
        numericFieldKey3: collectionInfo.numericField3,
        oneLineFieldKey1: collectionInfo.oneLineField1,
        oneLineFieldKey2: collectionInfo.oneLineField2,
        oneLineFieldKey3: collectionInfo.oneLineField3,
        textFieldKey1: collectionInfo.textField1,
        textFieldKey2: collectionInfo.textField2,
        textFieldKey3: collectionInfo.textField3,
        dateFieldKey1: collectionInfo.dateField1,
        dateFieldKey2: collectionInfo.dateField2,
        dateFieldKey3: collectionInfo.dateField3,
        checkboxFieldKey1: collectionInfo.checkboxField1,
        checkboxFieldKey2: collectionInfo.checkboxField2,
        checkboxFieldKey3: collectionInfo.checkboxField3,
      }));
    } catch (error) {
      setCollectionExists(false);
    }
  }, [request, collectionId, token]);

  const getCollection = useCallback(async () => {
    try {
      let response = await request(
        `/api/collections/${collectionId}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );
      const collectionInfo = response.collection;
      const ownerName = response.ownerName;

      response = await request(`/api/topics/${collectionInfo.topic}`);
      const topicName = response.topic.name;

      setCollection({
        name: collectionInfo.name,
        owner: ownerName,
        description: collectionInfo.description,
        topic: topicName,
        imageUrl: collectionInfo.imageUrl,
        created: new Date(collectionInfo.created),
      });
    } catch (e) {
      setCollectionExists(false);
    }
  }, [request, collectionId, token]);

  return {
    getItemForm,
    getCollection,
    itemForm,
    collectionExists,
    collection,
  };
};

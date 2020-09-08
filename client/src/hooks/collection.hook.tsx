import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "./http.hook";
import { ICreateItemForm } from "../interfaces/common";

export const useCollection = (collectionId: string) => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [itemForm, setItemForm] = useState<ICreateItemForm>({
    existingTags: [],
  });
  const [collectionExists, setCollectionExists] = useState(true);

  const getCollection = useCallback(async () => {
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

  return { getCollection, itemForm, collectionExists };
};

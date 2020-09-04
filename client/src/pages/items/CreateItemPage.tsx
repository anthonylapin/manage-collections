import React, { useCallback, useEffect, useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  ICreateItemPage,
  ICreateItemForm,
  IItemObj,
} from "../../interfaces/common";
import { useHttp } from "../../hooks/http.hook";
import { CreateItemForm } from "../../components/items/CreateItemForm";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components/common/Loader";

export const CreateItemPage: React.FC = () => {
  const collectionId = useParams<ICreateItemPage>().collectionId;
  const [itemForm, setItemForm] = useState<ICreateItemForm>({
    existingTags: [],
  });
  const [collectionExists, setCollectionExists] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const { request, clearError, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const history = useHistory();

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

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const submitHandler = async (itemObj: IItemObj) => {
    try {
      await request(
        "/api/items/create",
        "POST",
        { ...itemObj, collectionId },
        { Authorization: `Bearer ${token}` }
      );
      setShowSuccess(true);
      setTimeout(() => {
        history.push("/show/collections");
      }, 5000);
    } catch (e) {}
  };

  if (!collectionExists) {
    return <h1>NOT FOUND</h1>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="createItemPage">
      {showSuccess && (
        <div className="alert alert-success" role="alert">
          New item has been created successfully! You will be redirected to show
          collections page in 5 seconds...
        </div>
      )}

      {!showSuccess && (
        <CreateItemForm itemForm={itemForm} submitHandler={submitHandler} />
      )}
    </div>
  );
};

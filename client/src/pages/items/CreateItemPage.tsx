import React, { useEffect, useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  ICreateItemPage,
  IItemObj,
  IDefaultItemFormValues,
} from "../../interfaces/common";
import { useHttp } from "../../hooks/http.hook";
import { useCollection } from "../../hooks/collection.hook";
import { ItemForm } from "../../components/items/ItemForm";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../../components/common/Loader";

const defaultValues: IDefaultItemFormValues = {
  name: "",
  tags: "",
  numericField1: 0,
  numericField2: 0,
  numericField3: 0,
  oneLineField1: "",
  oneLineField2: "",
  oneLineField3: "",
  textField1: "",
  textField2: "",
  textField3: "",
  dateField1: new Date(),
  dateField2: new Date(),
  dateField3: new Date(),
  checkboxField1: false,
  checkboxField2: false,
  checkboxField3: false,
};

export const CreateItemPage: React.FC = () => {
  const collectionId = useParams<ICreateItemPage>().collectionId;
  const { getCollection, itemForm, collectionExists } = useCollection(
    collectionId
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const { request, clearError, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const history = useHistory();

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
        <ItemForm
          header="Create item"
          defaultValues={defaultValues}
          itemForm={itemForm}
          submitHandler={submitHandler}
          buttonName="Create"
        />
      )}
    </div>
  );
};

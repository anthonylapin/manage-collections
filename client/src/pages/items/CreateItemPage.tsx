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
import { SuccessAlert } from "../../components/common/SuccessAlert";
import { ThemeContext } from "styled-components";
import { darkTheme } from "../../components/themes/Themes";
import { TranslateContext } from "../../context/TranslateContext";

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
  const { getItemForm, itemForm, collectionExists } = useCollection(
    collectionId
  );
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const isDark = useContext(ThemeContext) === darkTheme;
  const { dictionary } = useContext(TranslateContext);

  const { request, clearError, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getItemForm();
  }, [getItemForm]);

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
      setShowSuccessAlert(true);
      setTimeout(() => {
        history.push("/show/collections");
      }, 1500);
    } catch (e) {}
  };

  if (!collectionExists) {
    return <h1>{dictionary.notFound}</h1>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="createItemPage">
      {showSuccessAlert && (
        <SuccessAlert message={dictionary.itemHasBeenCreatedSuccessfully} />
      )}

      {!showSuccessAlert && (
        <ItemForm
          header={dictionary.createItem}
          defaultValues={defaultValues}
          itemForm={itemForm}
          submitHandler={submitHandler}
          buttonName={dictionary.Create}
          isDark={isDark}
        />
      )}
    </div>
  );
};

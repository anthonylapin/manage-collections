import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { TranslateContext } from "../../context/TranslateContext";
import {
  ICollectionFormValues,
  ICreateCollectionValues,
  ITopic,
} from "../../interfaces/common";
import { CollectionForm } from "../collections/CollectionForm";
import { darkTheme } from "../themes/Themes";

const defaultValues: ICollectionFormValues = {
  name: "",
  owner: "",
  description: "",
  topic: "",
  numericFieldKey1: "",
  numericFieldKey2: "",
  numericFieldKey3: "",
  oneLineFieldKey1: "",
  oneLineFieldKey2: "",
  oneLineFieldKey3: "",
  textFieldKey1: "",
  textFieldKey2: "",
  textFieldKey3: "",
  dateFieldKey1: "",
  dateFieldKey2: "",
  dateFieldKey3: "",
  checkboxFieldKey1: "",
  checkboxFieldKey2: "",
  checkboxFieldKey3: "",
};

interface IAdminCreateCollection {
  action: string;
  userId: string;
  topics: ITopic[];
  onSubmit: (
    userId: string,
    userAction: string,
    values: ICreateCollectionValues
  ) => void;
}

export const AdminCreateCollection: React.FC<IAdminCreateCollection> = ({
  action,
  userId,
  topics,
  onSubmit,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const isDark = useContext(ThemeContext) === darkTheme;

  const submitHandler = (values: ICreateCollectionValues) => {
    onSubmit(userId, action, values);
  };

  return (
    <CollectionForm
      onSubmit={submitHandler}
      defaultValues={defaultValues}
      topics={topics}
      buttonAction={dictionary.Create}
      isDark={isDark}
    />
  );
};

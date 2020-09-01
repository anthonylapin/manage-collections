import React from "react";
import { useParams } from "react-router-dom";
import { ICreateItemPage } from "../../interfaces/common";

export const CreateItemPage: React.FC = () => {
  const collectionId = useParams<ICreateItemPage>().collectionId;
  console.log(collectionId);
  return <h1>Create Item Page</h1>;
};

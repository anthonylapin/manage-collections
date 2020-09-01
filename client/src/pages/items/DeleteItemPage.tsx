import React from "react";
import { useParams } from "react-router-dom";
import { IDeleteItemPage } from "../../interfaces/common";

export const DeleteItemPage: React.FC = () => {
  const collectionId = useParams<IDeleteItemPage>().collectionId;
  console.log(collectionId);
  return <h1>Delete Item Page</h1>;
};

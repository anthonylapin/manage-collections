import React from "react";
import { IUpdateItemPage } from "../../interfaces/common";
import { useParams } from "react-router-dom";

export const UpdateItemPage: React.FC = () => {
  const collectionId = useParams<IUpdateItemPage>().collectionId;
  console.log(collectionId);
  return <h1>Update Item Page</h1>;
};

import React from "react";
import { useParams } from "react-router-dom";
import { IDetailItemPage } from "../../interfaces/common";

export const DetailItemPage: React.FC = () => {
  const itemId = useParams<IDetailItemPage>().itemId;
  return <h1>Item page {itemId}</h1>;
};

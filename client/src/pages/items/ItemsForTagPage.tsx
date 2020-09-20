import React from "react";
import { useParams } from "react-router-dom";

interface IItemsForTagPage {
  tagId: string;
}

export const ItemsForTagPage: React.FC = () => {
  const tagId = useParams<IItemsForTagPage>().tagId;
  console.log(tagId);
  return <h1>Items list</h1>;
};

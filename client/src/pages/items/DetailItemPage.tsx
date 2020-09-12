import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useItem } from "../../hooks/item.hooks";
import { IDetailItemPage } from "../../interfaces/common";
import { ItemCard } from "../../components/items/ItemCard";

export const DetailItemPage: React.FC = () => {
  const itemId = useParams<IDetailItemPage>().itemId;
  const { getItems, item, collection } = useItem(itemId);

  useEffect(() => {
    getItems();
  }, [getItems]);
  return <ItemCard item={item} collection={collection} />;
};

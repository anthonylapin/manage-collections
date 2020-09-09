import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/collection.hook";
import { ICollectionDetailParams } from "../../interfaces/common";
import { CollectionCard } from "../../components/collections/CollectionCard";
import { useItems } from "../../hooks/item.hooks";

export const CollectionDetailPage: React.FC = () => {
  const collectionId = useParams<ICollectionDetailParams>().id;
  const { collection, getCollection, collectionExists } = useCollection(
    collectionId
  );
  const { items } = useItems(collectionId);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  if (!collectionExists) {
    return <h1>NOT FOUND</h1>;
  }

  return (
    <div>
      <CollectionCard collection={collection} items={items} />
    </div>
  );
};

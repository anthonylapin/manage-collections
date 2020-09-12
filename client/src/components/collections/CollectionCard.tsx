import React from "react";
import ReactMarkdown from "react-markdown";
import { ICollectionCard } from "../../interfaces/common";
import { ItemsList } from "../items/ItemsList";

export const CollectionCard: React.FC<ICollectionCard> = ({
  collection,
  items,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <div className="card" style={{ display: "table", margin: "0 auto" }}>
        <img
          src={collection.imageUrl}
          className="card-img-top"
          alt=""
          style={{ maxHeight: "400px", maxWidth: "400px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{collection.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Owner: {collection.owner}
          </h6>
          <p className="card-text">Topic: {collection.topic}</p>
          <ReactMarkdown
            className="card-text"
            source={collection.description}
          />
          <ItemsList items={items} />
        </div>
      </div>
    </div>
  );
};

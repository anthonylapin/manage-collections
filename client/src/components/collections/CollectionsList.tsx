import React from "react";
import { Link } from "react-router-dom";
import { ICollection, ICollectionsList } from "../../interfaces/common";

export const CollectionsList: React.FC<ICollectionsList> = ({
  collections,
}) => {
  if (!collections.length) {
    return (
      <div>
        <div className="card-text">No items created yet.</div>
      </div>
    );
  }

  return (
    <ul>
      {collections.map((collection, index) => (
        <li key={index}>
          <Link to={`/collection/detail/${collection._id}`}>
            {collection.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

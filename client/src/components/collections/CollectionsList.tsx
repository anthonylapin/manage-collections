import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TranslateContext } from "../../context/TranslateContext";
import { ICollectionsList } from "../../interfaces/common";

export const CollectionsList: React.FC<ICollectionsList> = ({
  collections,
}) => {
  const { dictionary } = useContext(TranslateContext);
  if (!collections.length) {
    return (
      <div>
        <div className="card-text">{dictionary.noItemsCreatedYet}</div>
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

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TranslateContext } from "../../context/TranslateContext";
import { ICollectionTable } from "../../interfaces/common";

export const CollectionsTable: React.FC<ICollectionTable> = ({
  collections,
  isDark,
}) => {
  const { dictionary } = useContext(TranslateContext);
  return (
    <table className="table mt-4">
      <tbody>
        {collections.map((collection) => (
          <tr key={collection._id}>
            <th>
              <Link to={`/collection/detail/${collection._id}`}>
                {collection.name}
              </Link>
            </th>
            <th>
              <Link
                to={`/create/item/${collection._id}`}
                className={
                  isDark ? "btn btn-outline-primary" : "btn btn-primary"
                }
              >
                {dictionary.addItem}
              </Link>
            </th>
            <th>
              <Link
                to={`/update/item/${collection._id}`}
                className={
                  isDark ? "btn btn-outline-secondary" : "btn btn-secondary"
                }
              >
                {dictionary.updateItem}
              </Link>
            </th>
            <th>
              <Link
                to={`/delete/item/${collection._id}`}
                className={isDark ? "btn btn-outline-danger" : "btn btn-danger"}
              >
                {dictionary.deleteItem}
              </Link>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

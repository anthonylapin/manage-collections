import React, { useContext } from "react";
import { IItemsList } from "../../interfaces/common";
import { Link } from "react-router-dom";
import { TranslateContext } from "../../context/TranslateContext";

export const ItemsList: React.FC<IItemsList> = ({ items }) => {
  const { dictionary } = useContext(TranslateContext);
  if (!items.length) {
    return (
      <div>
        <div className="card-text">{dictionary.noItemsCreatedYet}</div>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={`/item/detail/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

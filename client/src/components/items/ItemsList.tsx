import React from "react";
import { IItemsList } from "../../interfaces/common";
import { Link } from "react-router-dom";

export const ItemsList: React.FC<IItemsList> = ({ items }) => {
  return (
    <div>
      <div className="card-text">Items:</div>
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
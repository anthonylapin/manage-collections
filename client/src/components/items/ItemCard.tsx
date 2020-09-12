import React from "react";
import { Link } from "react-router-dom";
import { IItemCard } from "../../interfaces/common";

const yyyymmdd = (date_ob: Date) => {
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  return year + "-" + month + "-" + date;
};

export const ItemCard: React.FC<IItemCard> = ({ item, collection }) => {
  return (
    <div className="card">
      <div className="card-header">
        <b>{item.name}</b>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Collection:{" "}
          <Link to={`/collection/detail/${collection._id}`}>
            {collection.name}
          </Link>
        </li>
        <li className="list-group-item">Owner: {collection.owner}</li>
        <li className="list-group-item">Topic: {collection.topic}</li>
        <li className="list-group-item">
          {item.tags?.length
            ? `Tags: ${item.tags?.join(", ")}`
            : "This item has no tags"}
        </li>
        {collection.numericFieldKey1 && (
          <li className="list-group-item">
            {collection.numericFieldKey1}: {item.numericField1}
          </li>
        )}
        {collection.numericFieldKey2 && (
          <li className="list-group-item">
            {collection.numericFieldKey2}: {item.numericField2}
          </li>
        )}
        {collection.numericFieldKey3 && (
          <li className="list-group-item">
            {collection.numericFieldKey3}: {item.numericField3}
          </li>
        )}
        {collection.oneLineFieldKey1 && (
          <li className="list-group-item">
            {collection.oneLineFieldKey1}: {item.oneLineField1}
          </li>
        )}
        {collection.oneLineFieldKey2 && (
          <li className="list-group-item">
            {collection.oneLineFieldKey2}: {item.oneLineField2}
          </li>
        )}
        {collection.oneLineFieldKey3 && (
          <li className="list-group-item">
            {collection.oneLineFieldKey3}: {item.oneLineField3}
          </li>
        )}
        {collection.textFieldKey1 && (
          <li className="list-group-item">
            {collection.textFieldKey1}: {item.textField1}
          </li>
        )}
        {collection.oneLineFieldKey2 && (
          <li className="list-group-item">
            {collection.textFieldKey2}: {item.textField2}
          </li>
        )}
        {collection.oneLineFieldKey3 && (
          <li className="list-group-item">
            {collection.textFieldKey3}: {item.textField3}
          </li>
        )}
        {collection.dateFieldKey1 && (
          <li className="list-group-item">
            {collection.dateFieldKey1}:{" "}
            {yyyymmdd(item.dateField1 ? new Date(item.dateField1) : new Date())}
          </li>
        )}
        {collection.dateFieldKey2 && (
          <li className="list-group-item">
            {collection.dateFieldKey2}:{" "}
            {yyyymmdd(item.dateField2 ? new Date(item.dateField2) : new Date())}
          </li>
        )}
        {collection.dateFieldKey3 && (
          <li className="list-group-item">
            {collection.dateFieldKey3}:{" "}
            {yyyymmdd(item.dateField3 ? new Date(item.dateField3) : new Date())}
          </li>
        )}
        {collection.checkboxFieldKey1 && (
          <li className="list-group-item">
            {collection.checkboxFieldKey1}:{" "}
            <input type="checkbox" checked={item.checkboxField1} />
          </li>
        )}
        {collection.checkboxFieldKey2 && (
          <li className="list-group-item">
            {collection.checkboxFieldKey2}:{" "}
            <input type="checkbox" checked={item.checkboxField2} />
          </li>
        )}
        {collection.checkboxFieldKey3 && (
          <li className="list-group-item">
            {collection.checkboxFieldKey3}:{" "}
            <input type="checkbox" checked={item.checkboxField3} />
          </li>
        )}
        <li className="list-group-item">
          Item created:{" "}
          {yyyymmdd(item.created ? new Date(item.created) : new Date())}
        </li>
      </ul>
    </div>
  );
};

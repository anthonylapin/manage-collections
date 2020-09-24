import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { IItemCard } from "../../interfaces/common";
import { yyyymmdd } from "../../helper/dateConverter";
import { TranslateContext } from "../../context/TranslateContext";
import { AuthContext } from "../../context/AuthContext";

export const ItemCard: React.FC<IItemCard> = ({
  item,
  collection,
  onLike,
  likes,
  isDark,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const { isSuperuser } = useContext(AuthContext);
  const history = useHistory();
  return (
    <div className={isDark ? "card bg-dark" : "card"}>
      <div className="card-header">
        <b>{item.name}</b>
      </div>
      <ul
        className={
          isDark
            ? "list-group list-group-flush bg-dark"
            : "list-group list-group-flush"
        }
      >
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {dictionary.Collection}:{" "}
          <Link to={`/collection/detail/${collection._id}`}>
            {collection.name}
          </Link>
        </li>
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {dictionary.Owner}: {collection.owner}
        </li>
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {dictionary.Topic}: {collection.topic}
        </li>
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {item.tags?.length
            ? `${dictionary.Tags}: ${item.tags?.join(", ")}`
            : dictionary.thisItemHasNoTags}
        </li>
        {collection.numericFieldKey1 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.numericFieldKey1}: {item.numericField1}
          </li>
        )}
        {collection.numericFieldKey2 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.numericFieldKey2}: {item.numericField2}
          </li>
        )}
        {collection.numericFieldKey3 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.numericFieldKey3}: {item.numericField3}
          </li>
        )}
        {collection.oneLineFieldKey1 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.oneLineFieldKey1}: {item.oneLineField1}
          </li>
        )}
        {collection.oneLineFieldKey2 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.oneLineFieldKey2}: {item.oneLineField2}
          </li>
        )}
        {collection.oneLineFieldKey3 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.oneLineFieldKey3}: {item.oneLineField3}
          </li>
        )}
        {collection.textFieldKey1 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.textFieldKey1}: {item.textField1}
          </li>
        )}
        {collection.oneLineFieldKey2 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.textFieldKey2}: {item.textField2}
          </li>
        )}
        {collection.oneLineFieldKey3 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.textFieldKey3}: {item.textField3}
          </li>
        )}
        {collection.dateFieldKey1 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.dateFieldKey1}:{" "}
            {yyyymmdd(item.dateField1 ? new Date(item.dateField1) : new Date())}
          </li>
        )}
        {collection.dateFieldKey2 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.dateFieldKey2}:{" "}
            {yyyymmdd(item.dateField2 ? new Date(item.dateField2) : new Date())}
          </li>
        )}
        {collection.dateFieldKey3 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.dateFieldKey3}:{" "}
            {yyyymmdd(item.dateField3 ? new Date(item.dateField3) : new Date())}
          </li>
        )}
        {collection.checkboxFieldKey1 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.checkboxFieldKey1}:{" "}
            <input
              type="checkbox"
              checked={String(item.checkboxField1) === "true"}
              readOnly
            />
          </li>
        )}
        {collection.checkboxFieldKey2 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.checkboxFieldKey2}:{" "}
            <input
              type="checkbox"
              checked={String(item.checkboxField2) === "true"}
              readOnly
            />
          </li>
        )}
        {collection.checkboxFieldKey3 && (
          <li
            className={isDark ? "list-group-item bg-dark" : "list-group-item"}
          >
            {collection.checkboxFieldKey3}:{" "}
            <input
              type="checkbox"
              checked={String(item.checkboxField3) === "true"}
              readOnly
            />
          </li>
        )}
        <li className={isDark ? "list-group-item bg-dark" : "list-group-item"}>
          {dictionary.itemCreated}:{" "}
          {yyyymmdd(item.created ? new Date(item.created) : new Date())}
        </li>
      </ul>
      <div className="card-footer">
        {isSuperuser && (
          <div className="btn-toolbar mb-2" role="toolbar" aria-label="Toolbar">
            <div className="btn-group mr-2" role="group">
              <button
                type="button"
                className={
                  isDark ? "btn btn-outline-secondary" : "btn btn-secondary"
                }
                onClick={() => {
                  history.push(
                    `/update/item/${collection._id}?itemId=${item._id}`
                  );
                }}
              >
                {dictionary.updateItem}
              </button>
              <button
                type="button"
                className={
                  isDark ? "btn btn-outline-secondary" : "btn btn-secondary"
                }
                onClick={() => {
                  history.push(
                    `/delete/item/${collection._id}?itemId=${item._id}`
                  );
                }}
              >
                {dictionary.deleteItem}
              </button>
            </div>
          </div>
        )}
        <button
          onClick={onLike}
          className={isDark ? "btn btn-outline-danger" : "btn btn-danger"}
        >
          {dictionary.Like} {likes}
        </button>
      </div>
    </div>
  );
};

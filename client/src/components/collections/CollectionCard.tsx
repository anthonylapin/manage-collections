import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TranslateContext } from "../../context/TranslateContext";
import { ICollectionCard } from "../../interfaces/common";
import { ItemsFilterByComponent } from "../items/ItemsFilterByComponent";
import { ItemsList } from "../items/ItemsList";
import { ItemsSortByComponent } from "../items/ItemsSortByComponent";

export const CollectionCard: React.FC<ICollectionCard> = ({
  collection,
  items,
  onSort,
  onFilter,
  isDark,
  onExport,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const { isSuperuser } = useContext(AuthContext);
  const history = useHistory();
  return (
    <div style={{ width: "100%" }}>
      <div
        className={isDark ? "card bg-dark" : "card"}
        style={{ display: "table", margin: "0 auto" }}
      >
        <img
          src={collection.imageUrl}
          className="card-img-top"
          alt=""
          style={{ width: "100%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{collection.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {dictionary.Owner}: {collection.owner}
          </h6>
          <p className="card-text">
            {dictionary.Topic}: {collection.topic}
          </p>
          <ReactMarkdown
            className="card-text"
            source={collection.description}
          />
          <div className="card-text text-center">
            <h5>{dictionary.Items}</h5>
          </div>
          <div className="row">
            <ItemsSortByComponent onChange={onSort} />
            <ItemsFilterByComponent onChange={onFilter} />
          </div>
          <ItemsList items={items} />
          {isSuperuser && (
            <div
              className="btn-toolbar mb-2"
              role="toolbar"
              aria-label="Toolbar"
            >
              <div className="btn-group mr-2" role="group">
                <button
                  type="button"
                  className={
                    isDark ? "btn btn-outline-secondary" : "btn btn-secondary"
                  }
                  onClick={() => {
                    history.push(
                      `/update/collection?collectionId=${collection._id}`
                    );
                  }}
                >
                  {dictionary.updateCollection}
                </button>
                <button
                  type="button"
                  className={
                    isDark ? "btn btn-outline-secondary" : "btn btn-secondary"
                  }
                  onClick={() => {
                    history.push(
                      `/delete/collection?collectionId=${collection._id}`
                    );
                  }}
                >
                  {dictionary.deleteCollection}
                </button>
                <button
                  type="button"
                  className={
                    isDark ? "btn btn-outline-secondary" : "btn btn-secondary"
                  }
                  onClick={() => {
                    history.push(`/create/item/${collection._id}`);
                  }}
                >
                  {dictionary.addItem}
                </button>
              </div>
            </div>
          )}
          <button
            className={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
            onClick={onExport}
          >
            {dictionary.exportCollectionToCsv}
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TranslateContext } from "../../context/TranslateContext";

interface IManageCollectionsForm {
  isDark: boolean;
}

export const ManageCollectionsForm: React.FC<IManageCollectionsForm> = ({
  isDark,
}) => {
  const { dictionary } = useContext(TranslateContext);
  return (
    <div className="text-center">
      <h2>{dictionary.manageYourCollections}</h2>
      <div className="main-page-buttons">
        <Link
          className={
            isDark
              ? "btn btn-outline-primary btn-lg btn-block"
              : "btn btn-primary btn-lg btn-block"
          }
          to="/create/collection"
        >
          {dictionary.createNewCollection}
        </Link>
        <Link
          className={
            isDark
              ? "btn btn-outline-secondary btn-lg btn-block"
              : "btn btn-secondary btn-lg btn-block"
          }
          to="/update/collection"
        >
          {dictionary.updateCollection}
        </Link>
        <Link
          className={
            isDark
              ? "btn btn-outline-info btn-lg btn-block"
              : "btn btn-info btn-lg btn-block"
          }
          to="/show/collections"
        >
          {dictionary.showCollections}
        </Link>
        <Link
          className={
            isDark
              ? "btn btn-outline-danger btn-lg btn-block"
              : "btn btn-danger btn-lg btn-block"
          }
          to="/delete/collection"
        >
          {dictionary.deleteCollection}
        </Link>
      </div>
    </div>
  );
};

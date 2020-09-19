import React from "react";
import { Link } from "react-router-dom";

interface IManageCollectionsForm {
  isDark: boolean;
}

export const ManageCollectionsForm: React.FC<IManageCollectionsForm> = ({
  isDark,
}) => {
  return (
    <div className="text-center">
      <h2>Manage your collections</h2>
      <div className="main-page-buttons">
        <Link
          className={
            isDark
              ? "btn btn-outline-primary btn-lg btn-block"
              : "btn btn-primary btn-lg btn-block"
          }
          to="/create/collection"
        >
          Create new collection
        </Link>
        <Link
          className={
            isDark
              ? "btn btn-outline-secondary btn-lg btn-block"
              : "btn btn-secondary btn-lg btn-block"
          }
          to="/update/collection"
        >
          Update collection
        </Link>
        <Link
          className={
            isDark
              ? "btn btn-outline-info btn-lg btn-block"
              : "btn btn-info btn-lg btn-block"
          }
          to="/show/collections"
        >
          Show collections
        </Link>
        <Link
          className={
            isDark
              ? "btn btn-outline-danger btn-lg btn-block"
              : "btn btn-danger btn-lg btn-block"
          }
          to="/delete/collection"
        >
          Delete collection
        </Link>
      </div>
    </div>
  );
};

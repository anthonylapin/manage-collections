import React from "react";
import { Link } from "react-router-dom";

export const ManageCollectionsForm = () => {
  return (
    <div className="text-center">
      <h2>Manage your collections</h2>
      <div className="main-page-buttons">
        <Link
          className="btn btn-primary btn-lg btn-block"
          to="/create/collection"
        >
          Create new collection
        </Link>
        <Link
          className="btn btn-secondary btn-lg btn-block"
          to="/update/collection"
        >
          Update collection
        </Link>
        <Link className="btn btn-info btn-lg btn-block" to="/show/collections">
          Show collections
        </Link>
        <Link
          className="btn btn-danger btn-lg btn-block"
          to="/delete/collection"
        >
          Delete collection
        </Link>
      </div>
    </div>
  );
};

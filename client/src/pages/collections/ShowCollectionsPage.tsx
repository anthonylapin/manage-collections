import React, { useState, useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { CollectionsTable } from "../../components/collections/CollectionsTable";
import { ICollectionValues } from "../../interfaces/common";
import { Link } from "react-router-dom";

export const ShowCollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<ICollectionValues[]>([]);
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    try {
      const data = await request("/api/collections", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setCollections(data.collections);
    } catch (e) {}
  }, [request, auth.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!collections.length) {
    return (
      <div className="text-center">
        <h4>There is no created collections yet.</h4>
        <Link to="/create/collection">
          Click here to create a new collection.
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center">
        <h5>Your collections list</h5>
        <CollectionsTable collections={collections} />
      </div>
    </div>
  );
};

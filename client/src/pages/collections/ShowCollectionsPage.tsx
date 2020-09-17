import React, { useState, useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { CollectionsTable } from "../../components/collections/CollectionsTable";
import { ICollectionValues } from "../../interfaces/common";
import { Link } from "react-router-dom";
import { CollectionFilterByComponent } from "../../components/collections/CollectionFilterByComponent";
import { CollectionSortByComponent } from "../../components/collections/CollectionsSortByComponent";
import { useTopics } from "../../hooks/topic.hook";

export const ShowCollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<ICollectionValues[]>([]);
  const [collectionToShow, setCollectionsToShow] = useState<
    ICollectionValues[]
  >([]);
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const { topics, getTopics } = useTopics();

  const fetchData = useCallback(async () => {
    try {
      const data = await request("/api/collections", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setCollections(data.collections);
      setCollectionsToShow(data.collections);
    } catch (e) {}
  }, [request, auth.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  const sortCollections = async (key: string) => {
    try {
      const response = await request(
        `/api/collections?key=${key}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCollectionsToShow(response.collections);
    } catch (error) {}
  };

  const filterCollections = (key: string, value: string) => {
    if (key === "name") {
      filterCollectionsByName(value);
      return;
    }

    filterCollectionsByTopic(value);
  };

  const filterCollectionsByTopic = (topicId: string) => {
    setCollectionsToShow(collections);
    if (topicId !== "default") {
      setCollectionsToShow((prev) => {
        return prev.filter((collection) => collection.topic === topicId);
      });
    }
  };

  const filterCollectionsByName = (name: string) => {
    if (!name) {
      setCollectionsToShow(collections);
      return;
    }

    name = name.toLowerCase();
    setCollectionsToShow((prev) => {
      const arr: ICollectionValues[] = [];

      prev.forEach((collection) => {
        const collectionName = collection.name.toLowerCase();
        if (collectionName.includes(name)) {
          arr.push(collection);
        }
      });

      return arr;
    });
  };

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
        <div className="row">
          <CollectionSortByComponent onChange={sortCollections} />
          <CollectionFilterByComponent
            topics={topics}
            onChange={filterCollections}
          />
        </div>
        <CollectionsTable collections={collectionToShow} />
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SelectForm } from "../../components/common/SelectForm";
import { useCollections } from "../../hooks/collection.hook";
import { useHttp } from "../../hooks/http.hook";

export const DeleteCollectionPage: React.FC = () => {
  const { collections, getCollections } = useCollections();
  const { request } = useHttp();
  const history = useHistory();

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  const selectHandler = async (selectedId: string) => {
    try {
      await request(`/api/collections/${selectedId}`, "DELETE");
      history.push("/");
    } catch (e) {}
  };

  return (
    <div>
      <SelectForm
        items={collections.map((item) => ({
          _id: item._id,
          name: item.name,
        }))}
        onSelect={selectHandler}
        buttonClass="btn btn-danger"
        buttonAction="Delete"
        target="collection"
      />
    </div>
  );
};

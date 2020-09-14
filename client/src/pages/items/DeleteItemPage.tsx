import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IDeleteItemPage } from "../../interfaces/common";
import { SelectForm } from "../../components/common/SelectForm";
import { SuccessAlert } from "../../components/common/SuccessAlert";
import { useItems } from "../../hooks/item.hooks";
import { useHttp } from "../../hooks/http.hook";

export const DeleteItemPage: React.FC = () => {
  const collectionId = useParams<IDeleteItemPage>().collectionId;
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { items } = useItems(collectionId);
  const { request } = useHttp();
  const history = useHistory();

  const selectHandler = async (selectedId: string) => {
    try {
      await request(`/api/items/${selectedId}`, "DELETE");
      setShowSuccessAlert(true);
      setTimeout(() => {
        history.push("/show/collections");
      }, 1500);
    } catch (e) {}
  };

  return (
    <div>
      {showSuccessAlert && (
        <SuccessAlert message="Item has been deleted successfully" />
      )}

      {!showSuccessAlert && (
        <SelectForm
          target="item"
          buttonAction="Delete"
          buttonClass="btn btn-danger"
          items={items.map((item) => ({ _id: item._id, name: item.name }))}
          onSelect={selectHandler}
        />
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import {
  IUpdateItemPage,
  IItemObj,
  IDefaultItemFormValues,
} from "../../interfaces/common";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useCollection } from "../../hooks/collection.hook";
import { useItems } from "../../hooks/item.hooks";
import { Loader } from "../../components/common/Loader";
import { SelectForm } from "../../components/common/SelectForm";
import { ItemForm } from "../../components/items/ItemForm";
import { SuccessAlert } from "../../components/common/SuccessAlert";

export const UpdateItemPage: React.FC = () => {
  const collectionId = useParams<IUpdateItemPage>().collectionId;
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>("");
  const [showForm, setShowForm] = useState(false);
  const [defaultValues, setDefaultValues] = useState<IDefaultItemFormValues>({
    name: "",
    tags: "",
    numericField1: 0,
    numericField2: 0,
    numericField3: 0,
    oneLineField1: "",
    oneLineField2: "",
    oneLineField3: "",
    textField1: "",
    textField2: "",
    textField3: "",
    dateField1: new Date(),
    dateField2: new Date(),
    dateField3: new Date(),
    checkboxField1: false,
    checkboxField2: false,
    checkboxField3: false,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { request, loading } = useHttp();
  const { items } = useItems(collectionId);
  const { getItemForm, itemForm, collectionExists } = useCollection(
    collectionId
  );
  const history = useHistory();

  const getTags = async (itemId: string | undefined) => {
    try {
      const response = await request(`/api/tags/${itemId}`, "GET");
      return response.foundTags;
    } catch (e) {}
  };

  useEffect(() => {
    getItemForm();
  }, [getItemForm]);

  const selectHandler = async (selectedId: string) => {
    const foundItem = items.find((item) => item._id === selectedId);
    let tags = [];
    if (foundItem) {
      setSelectedItemId(foundItem._id);
      tags = await getTags(foundItem._id);
      setDefaultValues({
        name: foundItem.name,
        tags: tags.join(" "),
        numericField1: foundItem.numericField1,
        numericField2: foundItem.numericField2,
        numericField3: foundItem.numericField3,
        oneLineField1: foundItem.oneLineField1,
        oneLineField2: foundItem.oneLineField2,
        oneLineField3: foundItem.oneLineField3,
        textField1: foundItem.textField1,
        textField2: foundItem.textField2,
        textField3: foundItem.textField3,
        dateField1: foundItem.dateField1
          ? new Date(foundItem.dateField1)
          : new Date(),
        dateField2: foundItem.dateField2
          ? new Date(foundItem.dateField2)
          : new Date(),
        dateField3: foundItem.dateField3
          ? new Date(foundItem.dateField3)
          : new Date(),
        checkboxField1: false,
        checkboxField2: false,
        checkboxField3: false,
      });
    }

    setShowForm(true);
  };

  const submitHandler = async (submitObj: IItemObj) => {
    try {
      await request(
        `/api/items/${selectedItemId}`,
        "PUT",
        { item: submitObj },
        {}
      );
      setShowSuccessAlert(true);
      setTimeout(() => {
        history.push("/show/collections");
      }, 5000);
    } catch (e) {}
  };

  if (loading) {
    return <Loader />;
  }

  if (!collectionExists) {
    return <h1>NOT FOUND</h1>;
  }

  if (!items.length) {
    return (
      <div className="text-center mt-3">
        <h5>No items in collection yet. Nothing to update.</h5>
      </div>
    );
  }

  return (
    <div>
      {showSuccessAlert && (
        <SuccessAlert message="Item has been updated successfully" />
      )}

      {!showForm && !showSuccessAlert && (
        <SelectForm
          buttonAction="Find"
          target="item"
          items={items.map((item) => ({ _id: item._id, name: item.name }))}
          onSelect={selectHandler}
          buttonClass="btn btn-secondary"
        />
      )}
      {showForm && !showSuccessAlert && (
        <ItemForm
          header="Update item"
          defaultValues={defaultValues}
          itemForm={itemForm}
          submitHandler={submitHandler}
          buttonName="Update"
        />
      )}
    </div>
  );
};

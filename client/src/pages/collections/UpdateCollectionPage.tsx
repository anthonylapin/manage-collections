import React, { useEffect, useState, useContext } from "react";
import { SelectForm } from "../../components/common/SelectForm";
import { useCollections } from "../../hooks/collection.hook";
import {
  ICollectionFormValues,
  ICreateCollectionValues,
} from "../../interfaces/common";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { useTopics } from "../../hooks/topic.hook";
import { CollectionForm } from "../../components/collections/CollectionForm";
import { Loader } from "../../components/common/Loader";
import { uploadFileToGoogleStorage } from "../../helper/uploadFileToGoogleStorage";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { darkTheme } from "../../components/themes/Themes";

export const UpdateCollectionPage: React.FC = () => {
  const theme = useContext(ThemeContext);
  const isDark: boolean = theme === darkTheme;
  const [collectionId, setCollectionId] = useState("");
  const [collectionForm, setCollectionForm] = useState<ICollectionFormValues>({
    name: "",
    owner: "",
    description: "",
    topic: "",
    numericFieldKey1: "",
    numericFieldKey2: "",
    numericFieldKey3: "",
    oneLineFieldKey1: "",
    oneLineFieldKey2: "",
    oneLineFieldKey3: "",
    textFieldKey1: "",
    textFieldKey2: "",
    textFieldKey3: "",
    dateFieldKey1: "",
    dateFieldKey2: "",
    dateFieldKey3: "",
    checkboxFieldKey1: "",
    checkboxFieldKey2: "",
    checkboxFieldKey3: "",
  });
  const [showForm, setShowForm] = useState(false);
  const { topics, getTopics } = useTopics();
  const { getCollections, collections } = useCollections();
  const { request, loading, setLoading } = useHttp();
  const { token } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  const selectHandler = async (selectedId: string) => {
    setCollectionId(selectedId);
    try {
      const response = await request(
        `/api/collections/${selectedId}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      const fetchedCollection = response.collection;

      setCollectionForm({
        name: fetchedCollection.name,
        owner: fetchedCollection.owner,
        description: fetchedCollection.description,
        topic: fetchedCollection.topic,
        numericFieldKey1: fetchedCollection.numericField1,
        numericFieldKey2: fetchedCollection.numericField2,
        numericFieldKey3: fetchedCollection.numericField3,
        oneLineFieldKey1: fetchedCollection.oneLineField1,
        oneLineFieldKey2: fetchedCollection.oneLineField2,
        oneLineFieldKey3: fetchedCollection.oneLineField3,
        textFieldKey1: fetchedCollection.textField1,
        textFieldKey2: fetchedCollection.textField2,
        textFieldKey3: fetchedCollection.textField3,
        dateFieldKey1: fetchedCollection.dateField1,
        dateFieldKey2: fetchedCollection.dateField2,
        dateFieldKey3: fetchedCollection.dateField3,
        checkboxFieldKey1: fetchedCollection.checkboxField1,
        checkboxFieldKey2: fetchedCollection.checkboxField2,
        checkboxFieldKey3: fetchedCollection.checkboxField3,
      });

      setShowForm(true);
    } catch (e) {}
  };

  const submitHandler = async (submitObj: ICreateCollectionValues) => {
    try {
      setLoading(true);
      let imageUrl = await uploadFileToGoogleStorage(submitObj.file);
      setLoading(false);
      delete submitObj["file"];
      if (imageUrl) {
        submitObj["imageUrl"] = imageUrl;
      }

      await request(`/api/collections/${collectionId}`, "PUT", submitObj);

      history.push("/");
    } catch (e) {}
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {!showForm && (
        <SelectForm
          onSelect={selectHandler}
          items={collections.map((item) => ({
            _id: item._id,
            name: item.name,
          }))}
          buttonClass={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
          buttonAction="Find"
          target="collection"
        />
      )}
      {showForm && (
        <CollectionForm
          onSubmit={submitHandler}
          defaultValues={collectionForm}
          topics={topics}
          buttonAction="Update"
          isDark={isDark}
        />
      )}
    </div>
  );
};

import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CollectionForm } from "../../components/collections/CollectionForm";
import { useHttp } from "../../hooks/http.hook";
import { uploadFileToGoogleStorage } from "../../helper/uploadFileToGoogleStorage";
import { AuthContext } from "../../context/AuthContext";
import {
  ICreateCollectionValues,
  ICollectionFormValues,
} from "../../interfaces/common";
import { Loader } from "../../components/common/Loader";
import { useTopics } from "../../hooks/topic.hook";

const defaultValues: ICollectionFormValues = {
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
};

export const CreateCollectionPage: React.FC = () => {
  const { topics, getTopics } = useTopics();
  const { request, loading, setLoading } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  const handleCreateCollection = async (values: ICreateCollectionValues) => {
    setLoading(true);
    let imageUrl = await uploadFileToGoogleStorage(values.file);
    setLoading(false);

    values["imageUrl"] = imageUrl;
    delete values["file"];

    if (!values.topic) {
      values.topic = topics[0].id;
    }

    try {
      await request("/api/collections/create", "POST", values, {
        Authorization: `Bearer ${auth.token}`,
      });
      history.push("/");
    } catch (e) {}
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <CollectionForm
      defaultValues={defaultValues}
      topics={topics}
      onSubmit={handleCreateCollection}
      buttonAction="Create"
    />
  );
};

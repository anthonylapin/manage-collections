import React, { useContext, useState } from "react";
import {
  ICollectionForm,
  ICreateCollectionValues,
} from "../../interfaces/common";
import { useFormik } from "formik";
import { SelectTopicForm } from "../topics/SelectTopicForm";
import { TranslateContext } from "../../context/TranslateContext";

export const CollectionForm: React.FC<ICollectionForm> = ({
  topics,
  onSubmit,
  defaultValues,
  buttonAction,
  isDark,
}) => {
  const [file, setFile] = useState<Blob | string>("");
  const [showAlert, setShowAlert] = useState({
    name: false,
    description: false,
  });

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      name: defaultValues.name,
      topic: defaultValues.topic,
      description: defaultValues.description,
      numericField1: defaultValues.numericFieldKey1,
      numericField2: defaultValues.numericFieldKey2,
      numericField3: defaultValues.numericFieldKey3,
      oneLineField1: defaultValues.oneLineFieldKey1,
      oneLineField2: defaultValues.oneLineFieldKey2,
      oneLineField3: defaultValues.oneLineFieldKey3,
      textField1: defaultValues.textFieldKey1,
      textField2: defaultValues.textFieldKey2,
      textField3: defaultValues.textFieldKey3,
      dateField1: defaultValues.dateFieldKey1,
      dateField2: defaultValues.dateFieldKey2,
      dateField3: defaultValues.dateFieldKey3,
      checkboxField1: defaultValues.checkboxFieldKey1,
      checkboxField2: defaultValues.checkboxFieldKey2,
      checkboxField3: defaultValues.checkboxFieldKey3,
    },
    onSubmit: (values) => {
      const formValuesObj: ICreateCollectionValues = {
        ...values,
        file,
      };

      if (values.name && values.description) {
        onSubmit(formValuesObj);
      }

      if (!values.name) {
        setShowAlert((prev) => ({ ...prev, name: true }));
      }

      if (!values.description) {
        setShowAlert((prev) => ({ ...prev, description: true }));
      }
    },
  });

  const getOptions = () => {
    return topics.map((topic, index) => (
      <option key={index} value={topic.id}>
        {topic.name}
      </option>
    ));
  };

  const { dictionary } = useContext(TranslateContext);

  const fieldMustBeNonEmpty = () => {
    return (
      <div>
        <hr />
        <div className="alert alert-danger" role="alert">
          {dictionary.thisFieldMustBeNonEmpty}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>
        <b>{dictionary.requiredFields}</b>
      </p>
      <div className="form-group">
        {showAlert.name && fieldMustBeNonEmpty()}
        <label htmlFor="name">{dictionary.collectionName}</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Quentin Tarantino Filmography"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <SelectTopicForm
        onChange={formik.handleChange}
        value={formik.values.topic}
        getOptions={getOptions}
      />
      <div className="form-group">
        {showAlert.description && fieldMustBeNonEmpty()}
        <label htmlFor="description">{dictionary.shortDescription}</label>
        <textarea
          className="form-control"
          id="description"
          rows={3}
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="file">{dictionary.Image}</label>
        <input
          type="file"
          className={
            isDark ? "form-control-file text-light" : "form-control-file"
          }
          id="file"
          onChange={handleFileChange}
        />
      </div>
      <p>
        <b>{dictionary.optionalFields}</b>
      </p>
      <div className="form-group">
        <label htmlFor="numericField1">
          {dictionary.Custom} {dictionary.numeric} {dictionary.field} #1
        </label>
        <input
          type="text"
          className="form-control"
          id="numericField1"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.numericField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numericField2">
          {dictionary.Custom} {dictionary.numeric} {dictionary.field} #2
        </label>
        <input
          type="text"
          className="form-control"
          id="numericField2"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.numericField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numericField3">
          {dictionary.Custom} {dictionary.numeric} {dictionary.field} #3
        </label>
        <input
          type="text"
          className="form-control"
          id="numericField3"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.numericField3}
        />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="oneLineField1">
          {dictionary.Custom} {dictionary.oneLine} {dictionary.field} #1
        </label>
        <input
          type="text"
          className="form-control"
          id="oneLineField1"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.oneLineField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="oneLineField2">
          {dictionary.Custom} {dictionary.oneLine} {dictionary.field} #2
        </label>
        <input
          type="text"
          className="form-control"
          id="oneLineField2"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.oneLineField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="oneLineField3">
          {dictionary.Custom} {dictionary.oneLine} {dictionary.field} #3
        </label>
        <input
          type="text"
          className="form-control"
          id="oneLineField3"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.oneLineField3}
        />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="textField1">
          {dictionary.Custom} {dictionary.text} {dictionary.field} #1
        </label>
        <input
          type="text"
          className="form-control"
          id="textField1"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.textField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="textField2">
          {dictionary.Custom} {dictionary.text} {dictionary.field} #2
        </label>
        <input
          type="text"
          className="form-control"
          id="textField2"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.textField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="textField3">
          {dictionary.Custom} {dictionary.text} {dictionary.field} #3
        </label>
        <input
          type="text"
          className="form-control"
          id="textField3"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.textField3}
        />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="dateField1">
          {dictionary.Custom} {dictionary.date} {dictionary.field} #1
        </label>
        <input
          type="text"
          className="form-control"
          id="dateField1"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.dateField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateField2">
          {dictionary.Custom} {dictionary.date} {dictionary.field} #2
        </label>
        <input
          type="text"
          className="form-control"
          id="dateField2"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.dateField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateField3">
          {dictionary.Custom} {dictionary.date} {dictionary.field} #3
        </label>
        <input
          type="text"
          className="form-control"
          id="dateField3"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.dateField3}
        />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="checkboxField1">
          {dictionary.Custom} {dictionary.checkbox} {dictionary.field} #1
        </label>
        <input
          type="text"
          className="form-control"
          id="checkboxField1"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.checkboxField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkboxField2">
          {dictionary.Custom} {dictionary.checkbox} {dictionary.field} #2
        </label>
        <input
          type="text"
          className="form-control"
          id="checkboxField2"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.checkboxField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkboxField3">
          {dictionary.Custom} {dictionary.checkbox} {dictionary.field} #3
        </label>
        <input
          type="text"
          className="form-control"
          id="checkboxField3"
          placeholder={dictionary.keyThatWillBeShownInEachItem}
          onChange={formik.handleChange}
          value={formik.values.checkboxField3}
        />
      </div>
      <button
        type="submit"
        className={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
      >
        {buttonAction}
      </button>
    </form>
  );
};

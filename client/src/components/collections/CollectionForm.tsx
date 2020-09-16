import React, { useState } from "react";
import {
  ICollectionForm,
  ICreateCollectionValues,
} from "../../interfaces/common";
import { useFormik } from "formik";
import { SelectTopicForm } from "../topics/SelectTopicForm";

export const CollectionForm: React.FC<ICollectionForm> = ({
  topics,
  onSubmit,
  defaultValues,
  buttonAction,
}) => {
  const [file, setFile] = useState<Blob | string>("");

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
      onSubmit(formValuesObj);
    },
  });

  const getOptions = () => {
    return topics.map((topic, index) => (
      <option key={index} value={topic.id}>
        {topic.name}
      </option>
    ));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <p>
        <b>Required fields</b>
      </p>
      <div className="form-group">
        <label htmlFor="name">Collection name</label>
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
        <label htmlFor="description">Short description</label>
        <textarea
          className="form-control"
          id="description"
          rows={3}
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="file">Image</label>
        <input
          type="file"
          className="form-control-file"
          id="file"
          onChange={handleFileChange}
        />
      </div>
      <p>
        <b>Optional fields</b>
      </p>
      <div className="form-group">
        <label htmlFor="numericField1">Custom numeric field #1</label>
        <input
          type="text"
          className="form-control"
          id="numericField1"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.numericField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numericField2">Custom numeric field #2</label>
        <input
          type="text"
          className="form-control"
          id="numericField2"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.numericField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numericField3">Custom numeric field #3</label>
        <input
          type="text"
          className="form-control"
          id="numericField3"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.numericField3}
        />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="oneLineField1">Custom one-line field #1</label>
        <input
          type="text"
          className="form-control"
          id="oneLineField1"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.oneLineField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="oneLineField2">Custom one-line field #2</label>
        <input
          type="text"
          className="form-control"
          id="oneLineField2"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.oneLineField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="oneLineField3">Custom one-line field #3</label>
        <input
          type="text"
          className="form-control"
          id="oneLineField3"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.oneLineField3}
        />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="textField1">Custom text field #1</label>
        <input
          type="text"
          className="form-control"
          id="textField1"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.textField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="textField2">Custom text field #2</label>
        <input
          type="text"
          className="form-control"
          id="textField2"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.textField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="textField3">Custom text field #3</label>
        <input
          type="text"
          className="form-control"
          id="textField3"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.textField3}
        />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="dateField1">Custom date field #1</label>
        <input
          type="text"
          className="form-control"
          id="dateField1"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.dateField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateField2">Custom date field #2</label>
        <input
          type="text"
          className="form-control"
          id="dateField2"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.dateField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dateField3">Custom date field #3</label>
        <input
          type="text"
          className="form-control"
          id="dateField3"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.dateField3}
        />
      </div>
      <hr />
      <div className="form-group">
        <label htmlFor="checkboxField1">Custom checkbox field #1</label>
        <input
          type="text"
          className="form-control"
          id="checkboxField1"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.checkboxField1}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkboxField2">Custom checkbox field #2</label>
        <input
          type="text"
          className="form-control"
          id="checkboxField2"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.checkboxField2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkboxField3">Custom checkbox field #3</label>
        <input
          type="text"
          className="form-control"
          id="checkboxField3"
          placeholder="Key that will be shown in each item"
          onChange={formik.handleChange}
          value={formik.values.checkboxField3}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {buttonAction}
      </button>
    </form>
  );
};

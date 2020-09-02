import React, { useState } from "react";
import AutoSuggest from "react-autosuggest";
import { ICreateItemFormProps } from "../../interfaces/common";
import { useFormik } from "formik";

export const CreateItemForm: React.FC<ICreateItemFormProps> = ({
  itemForm,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      tags: "",
      numericField1: "",
      numericField2: "",
      numericField3: "",
      oneLineField1: "",
      oneLineField2: "",
      oneLineField3: "",
      textField1: "",
      textField2: "",
      textField3: "",
      dateField1: "",
      dateField2: "",
      dateField3: "",
      checkboxField1: "",
      checkboxField2: "",
      checkboxField3: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const lowerCasedTags = itemForm.existingTags.map((tag: string) =>
    tag.toLowerCase()
  );

  function getSuggestions(value: string): string[] {
    return lowerCasedTags.filter((tag: string) =>
      tag.startsWith(value.trim().toLowerCase())
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <AutoSuggest
          id="tags"
          suggestions={suggestions}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionSelected={(_, { suggestionValue }) =>
            console.log("Selected: " + suggestionValue)
          }
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <span>{suggestion}</span>}
          inputProps={{
            placeholder: "Type tags",
            value: formik.values.tags,
            onChange: formik.handleChange,
          }}
          highlightFirstSuggestion={true}
        />
      </div>
      {itemForm.numericFieldKey1 && (
        <div className="form-group">
          <label htmlFor="numericField1">{itemForm.numericFieldKey1}</label>
          <input type="text" className="form-control" id="numericField1" />
        </div>
      )}
      {itemForm.numericFieldKey2 && (
        <div className="form-group">
          <label htmlFor="numericField2">{itemForm.numericFieldKey2}</label>
          <input type="text" className="form-control" id="numericField2" />
        </div>
      )}
      {itemForm.numericFieldKey3 && (
        <div className="form-group">
          <label htmlFor="numericField3">{itemForm.numericFieldKey3}</label>
          <input type="text" className="form-control" id="numericField3" />
        </div>
      )}
      {itemForm.oneLineFieldKey1 && (
        <div className="form-group">
          <label htmlFor="oneLineField1">{itemForm.oneLineFieldKey1}</label>
          <input type="text" className="form-control" id="oneLineField1" />
        </div>
      )}
      {itemForm.oneLineFieldKey2 && (
        <div className="form-group">
          <label htmlFor="oneLineField2">{itemForm.oneLineFieldKey2}</label>
          <input type="text" className="form-control" id="oneLineField2" />
        </div>
      )}
      {itemForm.oneLineFieldKey3 && (
        <div className="form-group">
          <label htmlFor="oneLineField3">{itemForm.oneLineFieldKey3}</label>
          <input type="text" className="form-control" id="oneLineField3" />
        </div>
      )}
      {itemForm.textFieldKey1 && (
        <div className="form-group">
          <label htmlFor="textField1">{itemForm.textFieldKey1}</label>
          <input type="text" className="form-control" id="textField1" />
        </div>
      )}
      {itemForm.textFieldKey2 && (
        <div className="form-group">
          <label htmlFor="textField2">{itemForm.textFieldKey2}</label>
          <input type="text" className="form-control" id="textField2" />
        </div>
      )}
      {itemForm.textFieldKey3 && (
        <div className="form-group">
          <label htmlFor="textField3">{itemForm.textFieldKey3}</label>
          <input type="text" className="form-control" id="textField3" />
        </div>
      )}
      {itemForm.dateFieldKey1 && (
        <div className="form-group">
          <label htmlFor="dateField1">{itemForm.dateFieldKey1}</label>
          <input type="text" className="form-control" id="dateField1" />
        </div>
      )}
      {itemForm.dateFieldKey2 && (
        <div className="form-group">
          <label htmlFor="dateField2">{itemForm.dateFieldKey2}</label>
          <input type="text" className="form-control" id="dateField2" />
        </div>
      )}
      {itemForm.dateFieldKey3 && (
        <div className="form-group">
          <label htmlFor="dateField3">{itemForm.dateFieldKey3}</label>
          <input type="text" className="form-control" id="dateField3" />
        </div>
      )}
      {itemForm.checkboxFieldKey1 && (
        <div className="form-group">
          <label htmlFor="checkboxField1">{itemForm.checkboxFieldKey1}</label>
          <input type="text" className="form-control" id="checkboxField1" />
        </div>
      )}
      {itemForm.dateFieldKey2 && (
        <div className="form-group">
          <label htmlFor="checkboxField2">{itemForm.checkboxFieldKey2}</label>
          <input type="text" className="form-control" id="checkboxField2" />
        </div>
      )}
      {itemForm.checkboxFieldKey3 && (
        <div className="form-group">
          <label htmlFor="checkboxField3">{itemForm.dateFieldKey3}</label>
          <input type="text" className="form-control" id="checkboxField3" />
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

import React, { useContext, useState } from "react";
import AutoSuggest from "react-autosuggest";
import { IItemFormProps, IItemObj } from "../../interfaces/common";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TranslateContext } from "../../context/TranslateContext";

export const ItemForm: React.FC<IItemFormProps> = ({
  itemForm,
  submitHandler,
  defaultValues,
  header,
  buttonName,
  isDark,
}) => {
  const { dictionary } = useContext(TranslateContext);
  const [tags, setTags] = useState(defaultValues.tags);
  const [startDate1, setStartDate1] = useState(defaultValues.dateField1);
  const [startDate2, setStartDate2] = useState(defaultValues.dateField2);
  const [startDate3, setStartDate3] = useState(defaultValues.dateField3);
  const [checkboxes, setCheckboxes] = useState({
    checkboxField1: defaultValues.checkboxField1,
    checkboxField2: defaultValues.checkboxField2,
    checkboxField3: defaultValues.checkboxField3,
  });

  const formik = useFormik({
    initialValues: {
      name: defaultValues.name,
      numericField1: defaultValues.numericField1,
      numericField2: defaultValues.numericField2,
      numericField3: defaultValues.numericField3,
      oneLineField1: defaultValues.oneLineField1,
      oneLineField2: defaultValues.oneLineField2,
      oneLineField3: defaultValues.oneLineField3,
      textField1: defaultValues.textField1,
      textField2: defaultValues.textField2,
      textField3: defaultValues.textField3,
    },
    onSubmit: (values) => {
      const numericFields = {
        numericField1: Number(values.numericField1),
        numericField2: Number(values.numericField2),
        numericField3: Number(values.numericField3),
      };

      let submitObj: IItemObj = {
        ...values,
        ...checkboxes,
        ...numericFields,
        tags: tags.trim().split(" "),
        dateField1: startDate1,
        dateField2: startDate2,
        dateField3: startDate3,
      };

      let atLeastOneShown = validateValues(submitObj);
      if (!atLeastOneShown) {
        submitHandler(submitObj);
      }
    },
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [alerts, setAlerts] = useState({
    name: false,
    numericField1: false,
    numericField2: false,
    numericField3: false,
    oneLineField1: false,
    oneLineField2: false,
    oneLineField3: false,
    textField1: false,
    textField2: false,
    textField3: false,
  });

  const lowerCasedTags = itemForm.existingTags.map((tag: string) =>
    tag.toLowerCase()
  );
  function getSuggestions(value: string): string[] {
    return lowerCasedTags.filter((tag: string) =>
      tag.startsWith(value.trim().toLowerCase())
    );
  }

  const handleDateChange1 = (date: Date) => {
    setStartDate1(date);
  };
  const handleDateChange2 = (date: Date) => {
    setStartDate2(date);
  };
  const handleDateChange3 = (date: Date) => {
    setStartDate3(date);
  };

  const handleCheckboxes = (e: any) => {
    setCheckboxes((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
    e.persist();
  };

  function validateValues(values: IItemObj) {
    let atLeastOneShown = false;
    if (!values.name) {
      atLeastOneShown = true;
      setAlerts((prev) => ({
        ...prev,
        name: true,
      }));
    }
    if (itemForm.numericFieldKey1) {
      if (!values.numericField1 || isNaN(Number(values.numericField1))) {
        atLeastOneShown = true;
        setAlerts((prev) => ({
          ...prev,
          numericField1: true,
        }));
      }
    }
    if (itemForm.numericFieldKey2) {
      if (!values.numericField2 || isNaN(Number(values.numericField2))) {
        atLeastOneShown = true;
        setAlerts((prev) => ({
          ...prev,
          numericField2: true,
        }));
      }
    }
    if (itemForm.numericFieldKey3) {
      if (!values.numericField3 || isNaN(Number(values.numericField3))) {
        atLeastOneShown = true;
        setAlerts((prev) => ({
          ...prev,
          numericField3: true,
        }));
      }
    }
    if (itemForm.oneLineFieldKey1 && !values.oneLineField1) {
      atLeastOneShown = true;
      setAlerts((prev) => ({
        ...prev,
        oneLineField1: true,
      }));
    }
    if (itemForm.oneLineFieldKey2 && !values.oneLineField2) {
      atLeastOneShown = true;
      setAlerts((prev) => ({
        ...prev,
        oneLineField2: true,
      }));
    }
    if (itemForm.oneLineFieldKey3 && !values.oneLineField3) {
      atLeastOneShown = true;
      setAlerts((prev) => ({
        ...prev,
        oneLineField3: true,
      }));
    }
    if (itemForm.textFieldKey1 && !values.textField1) {
      atLeastOneShown = true;
      setAlerts((prev) => ({
        ...prev,
        textField1: true,
      }));
    }
    if (itemForm.textFieldKey2 && !values.textField2) {
      atLeastOneShown = true;
      setAlerts((prev) => ({
        ...prev,
        textField2: true,
      }));
    }
    if (itemForm.textFieldKey3 && !values.textField3) {
      atLeastOneShown = true;
      setAlerts((prev) => ({
        ...prev,
        textField3: true,
      }));
    }

    return atLeastOneShown;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-center">
        <h5>{header}</h5>
      </div>
      <div className="form-group">
        {alerts.name && (
          <div className="show-alert">
            <div className="alert alert-danger" role="alert">
              {dictionary.thisFieldMustBeNonEmpty}
            </div>
          </div>
        )}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <AutoSuggest
          id="tags"
          suggestions={suggestions}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            setTags(value);
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionSelected={(_, { suggestionValue }) =>
            console.log("Selected: " + suggestionValue)
          }
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <span>{suggestion}</span>}
          inputProps={{
            placeholder: "Type tags",
            value: tags,
            name: "tags",
            onChange: (_, { newValue, method }) => {
              setTags(newValue);
            },
          }}
          highlightFirstSuggestion={true}
        />
      </div>
      {itemForm.numericFieldKey1 && (
        <div className="form-group">
          {alerts.numericField1 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmptyAndShouldContainNumericValue}
              </div>
            </div>
          )}
          <label htmlFor="numericField1">{itemForm.numericFieldKey1}</label>
          <input
            type="text"
            className="form-control"
            id="numericField1"
            value={formik.values.numericField1}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.numericFieldKey2 && (
        <div className="form-group">
          {alerts.numericField2 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmptyAndShouldContainNumericValue}
              </div>
            </div>
          )}
          <label htmlFor="numericField2">{itemForm.numericFieldKey2}</label>
          <input
            type="text"
            className="form-control"
            id="numericField2"
            value={formik.values.numericField2}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.numericFieldKey3 && (
        <div className="form-group">
          {alerts.numericField3 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmptyAndShouldContainNumericValue}
              </div>
            </div>
          )}

          <label htmlFor="numericField3">{itemForm.numericFieldKey3}</label>
          <input
            type="text"
            className="form-control"
            id="numericField3"
            value={formik.values.numericField3}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.oneLineFieldKey1 && (
        <div className="form-group">
          {alerts.oneLineField1 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmpty}
              </div>
            </div>
          )}

          <label htmlFor="oneLineField1">{itemForm.oneLineFieldKey1}</label>
          <input
            type="text"
            className="form-control"
            id="oneLineField1"
            value={formik.values.oneLineField1}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.oneLineFieldKey2 && (
        <div className="form-group">
          {alerts.oneLineField2 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmpty}
              </div>
            </div>
          )}
          <label htmlFor="oneLineField2">{itemForm.oneLineFieldKey2}</label>
          <input
            type="text"
            className="form-control"
            id="oneLineField2"
            value={formik.values.oneLineField2}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.oneLineFieldKey3 && (
        <div className="form-group">
          {alerts.oneLineField3 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmpty}
              </div>
            </div>
          )}
          <label htmlFor="oneLineField3">{itemForm.oneLineFieldKey3}</label>
          <input
            type="text"
            className="form-control"
            id="oneLineField3"
            value={formik.values.oneLineField3}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.textFieldKey1 && (
        <div className="form-group">
          {alerts.textField1 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmpty}
              </div>
            </div>
          )}
          <label htmlFor="textField1">{itemForm.textFieldKey1}</label>
          <textarea
            className="form-control"
            id="textField1"
            value={formik.values.textField1}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.textFieldKey2 && (
        <div className="form-group">
          {alerts.textField2 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmpty}
              </div>
            </div>
          )}
          <label htmlFor="textField2">{itemForm.textFieldKey2}</label>
          <textarea
            className="form-control"
            id="textField2"
            value={formik.values.textField2}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.textFieldKey3 && (
        <div className="form-group">
          {alerts.textField3 && (
            <div className="show-alert">
              <hr />
              <div className="alert alert-danger" role="alert">
                {dictionary.thisFieldMustBeNonEmpty}
              </div>
            </div>
          )}
          <label htmlFor="textField3">{itemForm.textFieldKey3}</label>
          <textarea
            className="form-control"
            id="textField3"
            value={formik.values.textField3}
            onChange={formik.handleChange}
          />
        </div>
      )}
      {itemForm.dateFieldKey1 && (
        <div className="form-group">
          <label htmlFor="dateField1">{itemForm.dateFieldKey1}</label>
          <DatePicker
            className="ml-2"
            onChange={handleDateChange1}
            selected={startDate1}
          />
        </div>
      )}
      {itemForm.dateFieldKey2 && (
        <div className="form-group">
          <label htmlFor="dateField2">{itemForm.dateFieldKey2}</label>
          <DatePicker
            className="ml-2"
            onChange={handleDateChange2}
            selected={startDate2}
          />
        </div>
      )}
      {itemForm.dateFieldKey3 && (
        <div className="form-group">
          <label htmlFor="dateField3">{itemForm.dateFieldKey3}</label>
          <DatePicker
            className="ml-2"
            onChange={handleDateChange3}
            selected={startDate3}
          />
        </div>
      )}

      {itemForm.checkboxFieldKey1 && (
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkboxField1"
            name="checkboxField1"
            onChange={handleCheckboxes}
          />
          <label className="form-check-label" htmlFor="checkboxField1">
            {itemForm.checkboxFieldKey1}
          </label>
        </div>
      )}

      {itemForm.checkboxFieldKey2 && (
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkboxField2"
            name="checkboxField2"
            onChange={handleCheckboxes}
          />
          <label className="form-check-label" htmlFor="checkboxField2">
            {itemForm.checkboxFieldKey2}
          </label>
        </div>
      )}

      {itemForm.checkboxFieldKey3 && (
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkboxField3"
            name="checkboxField3"
            onChange={handleCheckboxes}
          />
          <label className="form-check-label" htmlFor="checkboxField3">
            {itemForm.checkboxFieldKey3}
          </label>
        </div>
      )}

      <button
        type="submit"
        className={isDark ? "btn btn-outline-primary" : "btn btn-primary"}
      >
        {buttonName}
      </button>
    </form>
  );
};

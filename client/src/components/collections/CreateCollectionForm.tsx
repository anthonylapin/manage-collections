import React from 'react'
import {ICreateCollection} from "../../interfaces/common"
import {useFormik} from "formik"

export const CreateCollectionForm: React.FC<ICreateCollection> = ({topics}) => {
    const getOptions = () => {
        return topics.map((topic, index) => (
            <option key={index} value={topic.id}>
                {topic.name}
            </option>
        ))
    }
    return (
        <form>
            <p><b>Required fields</b></p>
            <div className="form-group">
                <label htmlFor="collectionName">Collection name</label>
                <input
                    type="text"
                    className="form-control"
                    id="collectionName"
                    placeholder="Quentin Tarantino filmography"
                />
            </div>
            <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <select className="form-control" id="topic">
                    {getOptions()}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Short description</label>
                <textarea className="form-control" id="description" rows={3} />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" className="form-control-file" id="image" />
            </div>
            <p><b>Optional fields</b></p>
            <div className="form-group">
                <label htmlFor="numericField1">Custom numeric field #1</label>
                <input
                    type="text"
                    className="form-control"
                    id="numericField1"
                    placeholder="Key that will be shown in each item"
                />
            </div>
            <div className="form-group">
                <label htmlFor="numericField2">Custom numeric field #2</label>
                <input
                    type="text"
                    className="form-control"
                    id="numericField2"
                    placeholder="Key that will be shown in each item"
                />
            </div>
            <div className="form-group">
                <label htmlFor="numericField3">Custom numeric field #3</label>
                <input
                    type="text"
                    className="form-control"
                    id="numericField3"
                    placeholder="Key that will be shown in each item"
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
                />
            </div>
            <div className="form-group">
                <label htmlFor="oneLineField2">Custom one-line field #2</label>
                <input
                    type="text"
                    className="form-control"
                    id="oneLineField2"
                    placeholder="Key that will be shown in each item"
                />
            </div>
            <div className="form-group">
                <label htmlFor="oneLineField3">Custom one-line field #3</label>
                <input
                    type="text"
                    className="form-control"
                    id="oneLineField3"
                    placeholder="Key that will be shown in each item"
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
                />
            </div>
            <div className="form-group">
                <label htmlFor="textField2">Custom text field #2</label>
                <input
                    type="text"
                    className="form-control"
                    id="textField2"
                    placeholder="Key that will be shown in each item"
                />
            </div>
            <div className="form-group">
                <label htmlFor="textField3">Custom text field #3</label>
                <input
                    type="text"
                    className="form-control"
                    id="textField3"
                    placeholder="Key that will be shown in each item"
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
                />
            </div>
            <div className="form-group">
                <label htmlFor="dateField2">Custom date field #2</label>
                <input
                    type="text"
                    className="form-control"
                    id="dateField2"
                    placeholder="Key that will be shown in each item"
                />
            </div>
            <div className="form-group">
                <label htmlFor="dateField3">Custom date field #3</label>
                <input
                    type="text"
                    className="form-control"
                    id="dateField3"
                    placeholder="Key that will be shown in each item"
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
                />
            </div>
            <div className="form-group">
                <label htmlFor="checkboxField2">Custom checkbox field #2</label>
                <input
                    type="text"
                    className="form-control"
                    id="checkboxField2"
                    placeholder="Key that will be shown in each item"
                />
            </div>
            <div className="form-group">
                <label htmlFor="checkboxField3">Custom checkbox field #3</label>
                <input
                    type="text"
                    className="form-control"
                    id="checkboxField3"
                    placeholder="Key that will be shown in each item"
                />
            </div>
        </form>
    )
}
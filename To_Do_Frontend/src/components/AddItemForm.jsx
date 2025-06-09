import React from 'react'
import '../styles/AddItemForm.css'

const AddItemForm = ({
                         addAction,
                         itemText,
                         onAddInput,
                         dateText,
                         onDateInput
                     }) => (
    <form onSubmit={addAction}>
        <div className="add-item-content">
            <label htmlFor="add" className={"add-item-input-label"}>
                Text:
            </label>
            &nbsp;
            <input
                className="add-item-input"
                id="add"
                value={itemText}
                onChange={onAddInput}
                type="text"/>
            &nbsp;
            <label htmlFor="date" className={"add-item-input-label"}>
                Date:
            </label>
            <input
                className={"add-item-input"}
                type="date"
                id="date"
                value={dateText}
                onChange={onDateInput}/>
            <button
                className={"add-item-button"}
                type={"submit"}
                disabled={!itemText || !dateText}>
                <strong>
                    Add Item
                </strong>
            </button>
        </div>
    </form>
);

export default AddItemForm;
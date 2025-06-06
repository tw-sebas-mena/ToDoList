import React from 'react'

const AddItemForm = ({
                         addAction,
                         itemText,
                         onAddInput,
                         dateText,
                         onDateInput
                     }) => (
    <form onSubmit={addAction}>
        <label htmlFor="add">
            Text:
        </label>
        &nbsp;
        <input
            id="add"
            value={itemText}
            onChange={onAddInput}
            type="text"/>
        &nbsp;
        <label htmlFor="date">
            Date:
        </label>
        <input
            type="date"
            id="date"
            value={dateText}
            onChange={onDateInput}/>
        <button
            type={"submit"}
            disabled={!itemText || !dateText}>
            <strong>
                Add Item
            </strong>
        </button>
    </form>
);

export default AddItemForm;
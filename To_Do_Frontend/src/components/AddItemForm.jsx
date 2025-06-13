import React from 'react'
import '../styles/components/AddItemForm.css'
import Select from "react-select";

const AddItemForm = ({
                         addAction,
                         itemText,
                         onAddInput,
                         dateText,
                         onDateInput,
                         tags,
                         onTagSelection,
                         selectedTags,
                     }) => {

    const options = tags.map(tag => ({value: tag.tagName, label: tag.tagName}));

    const handleChange = selectedOptions => {
        const selectedNames = (selectedOptions || []).map(opt => opt.value);
        onTagSelection(selectedNames);
    };

    return (
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
                    onChange={onDateInput}
                />

                <label className="add-item-input-label">Tags:</label>
                <Select
                    isMulti
                    options={options}
                    value={selectedTags.map(tag => ({ value: tag.tagName, label: tag.tagName }))}
                    onChange={handleChange}
                    placeholder="Select tags..."
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    classNamePrefix="react-select"
                    className={"add-dropdown"}
                />
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
    )
};

export default AddItemForm;
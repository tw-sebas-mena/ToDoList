import {format, parseISO} from "date-fns";
import React from "react";

const Item = ({
                  item,
                  onCompleteItem,
                  onEditItem,
                  editingId,
                  editingText,
                  editingDate,
                  onEditTextInput,
                  onEditDateInput,
                  onCancelEditItem,
                  onSaveItem
              }) => (
    <li>
        {editingId === item.id ? (
            <span>
                <input value={editingText} onChange={onEditTextInput} type="text"/>
                <input value={editingDate} onChange={onEditDateInput} type="date"/>
            </span>
        ) : (
            <span>
                    {item.text}
                {" - "}
                {
                    item.date ? format(parseISO(item.date), 'dd-MM-yyyy') : "No date"
                }
                </span>
        )}
        &nbsp;
        <span>
            {editingId === item.id ? (
                <>
                    <button type="button" onClick={() => onSaveItem(item, editingText, editingDate)}>
                        Save
                    </button>
                    <button type="button" onClick={() => onCancelEditItem(item, editingText, editingDate)}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <button type="button" onClick={() => onCompleteItem(item)}>
                        Mark as completed
                    </button>
                    <button type="button" onClick={() => onEditItem(item)}>
                        Edit
                    </button>
                </>
            )}
      </span>
    </li>
);

export default Item;
import {format, parseISO} from "date-fns";
import React from "react";
import '../styles/components/Item.css';

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
    <li className={"item-component"}>
        <div className="item-content">
            {editingId === item.id ? (
                <>
                    <input className={"item-input item-text-input"} value={editingText} onChange={onEditTextInput}
                           type="text"/>
                    <input className={"item-input item-date-input"} value={editingDate} onChange={onEditDateInput}
                           type="date"/>
                </>
            ) : (
                <>
                    <div className={"item-text-display"}>
                        {item.text}
                    </div>
                    <div className={"item-date-display"}>
                        {item.date ? format(parseISO(item.date), 'dd-MM-yyyy') : "No date"}
                    </div>
                </>
            )}
        </div>
        &nbsp;
        <span className={"item-actions"}>
            {editingId === item.id ? (
                <>
                    <button className={"item-btn"} type="button"
                            onClick={() => onSaveItem(item, editingText, editingDate)}>
                        Save
                    </button>
                    <button className={"item-btn"} type="button"
                            onClick={() => onCancelEditItem(item, editingText, editingDate)}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <button className={"item-btn"} type="button" onClick={() => onCompleteItem(item)}>
                        Mark as completed
                    </button>
                    <button className={"item-btn"} type="button" onClick={() => onEditItem(item)}>
                        Edit
                    </button>
                </>
            )}
      </span>
    </li>
);

export default Item;
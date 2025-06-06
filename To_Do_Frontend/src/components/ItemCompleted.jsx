import React from "react";
import {parseISO, format} from "date-fns";

const ItemCompleted = ({
                           item,
                           onUnfinishItem,
                           onDeleteItem,
                       }) => (
    <li>
        <span>
            {item.text}
            {" - "}
            {item.date ? format(parseISO(item.date), 'dd-MM-yyyy') : "No date"}
        </span>
        &nbsp;
        <button type="button" onClick={() => onUnfinishItem(item)}>
            Mark as unfinished
        </button>
        <button type="button" onClick={() => onDeleteItem(item)}>
            Delete
        </button>
    </li>

);

export default ItemCompleted;
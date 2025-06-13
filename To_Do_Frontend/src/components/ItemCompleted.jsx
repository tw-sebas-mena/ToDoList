import React from "react";
import {parseISO, format} from "date-fns";
import '../styles/components/Item.css';
import ItemTag from "./ItemTag.jsx";

const ItemCompleted = ({
                           item,
                           onUnfinishItem,
                           onDeleteItem,
                       }) => (
    <li className={"item-component"}>
        <div className={"item-content"}>
            <div className={"item-text-display"}>
                {item.text}
            </div>
            <div className={"item-date-display"}>
                {item.date ? format(parseISO(item.date), 'dd-MM-yyyy') : "No date"}
            </div>
            <div className={"item-tags-display"}>
                {item.tags.map((tag, index) => (
                    <ItemTag
                        key={index}
                        text={tag.tagName}
                        colorCode={tag.colorCode}
                    />
                ))}
            </div>
        </div>
        &nbsp;
        <div className={"item-actions"}>
            <button className={"item-btn"} type="button" onClick={() => onUnfinishItem(item)}>
                Mark as unfinished
            </button>
            <button className={"item-btn"} type="button" onClick={() => onDeleteItem(item)}>
                Delete
            </button>
        </div>
    </li>

);

export default ItemCompleted;
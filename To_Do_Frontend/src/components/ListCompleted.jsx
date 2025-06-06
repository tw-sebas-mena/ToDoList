import React from "react";
import ItemCompleted from "./ItemCompleted";

const ListCompleted = ({
                           list,
                           onUnfinishItem,
                           onDeleteItem,
                       }) => (
    <ul>
        {list.map((item) => (
            <ItemCompleted
                key={item.id}
                item={item}
                onUnfinishItem={onUnfinishItem}
                onDeleteItem={onDeleteItem}
            />
        ))}
    </ul>
);

export default ListCompleted;
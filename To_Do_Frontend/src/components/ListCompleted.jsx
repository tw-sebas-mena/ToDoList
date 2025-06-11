import React from "react";
import ItemCompleted from "./ItemCompleted";
import '../styles/components/List.css'

const ListCompleted = ({
                           list,
                           onUnfinishItem,
                           onDeleteItem,
                       }) => (
    <ul className={"list-component"}>
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
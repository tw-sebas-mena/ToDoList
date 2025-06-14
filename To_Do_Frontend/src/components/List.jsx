import React from "react";
import Item from "./Item.jsx";
import '../styles/components/List.css'

const List = ({
                  onCompleteItem,
                  onEditItem,
                  editingId,
                  editingText,
                  editingDate,
                  sortedList,
                  onEditTextInput,
                  onEditDateInput,
                  onCancelEditItem,
                  onSaveItem,
                  onTagSelection,
                  editingTags,
                  tags
              }) => {

    return <ul className={"list-component"}>
        {
            sortedList.map((item) => (<Item key={item.id}
                                            item={item}
                                            onCompleteItem={onCompleteItem}
                                            onEditItem={onEditItem}
                                            editingId={editingId}
                                            editingText={editingText}
                                            onEditTextInput={onEditTextInput}
                                            onSaveItem={onSaveItem}
                                            editingDate={editingDate}
                                            onEditDateInput={onEditDateInput}
                                            onCancelEditItem={onCancelEditItem}
                                            onTagSelection={onTagSelection}
                                            selectedTags={editingTags}
                                            tags={tags}
                />
            ))}
    </ul>
};

export default List;

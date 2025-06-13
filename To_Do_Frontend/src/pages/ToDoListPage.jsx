import React, {useReducer, useCallback, useEffect, useMemo} from 'react'
import {toDoItemsReducer, initialState} from '../reducers/toDoItemsReducer'
import {fetchItemsAPI, addItemsAPI, updateItemsAPI, deleteItemsAPI, fetchTagsAPI} from "../services/todoService"
import AddItemForm from "../components/AddItemForm";
import List from "../components/List";
import ListCompleted from "../components/ListCompleted";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider";
import '../styles/pages/ToDoListPage.css'

function ToDoListPage() {

    //STATES FOR AUTHENTICATION
    const navigate = useNavigate();
    const {token, userId, logout} = useAuth();

    // GLOBAL ITEMS STATE from REDUCER
    const [itemsState, dispatchItems] = useReducer(toDoItemsReducer, initialState);

    // STATES FOR ADDING ITEMS
    const [newItemText, setNewItemText] = React.useState('');
    const [newDateText, setNewDateText] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState([]);

    // STATES FOR EDITING ITEMS
    const [editingId, setEditingId] = React.useState(null);
    const [editingText, setEditingText] = React.useState('');
    const [editingDate, setEditingDate] = React.useState('');
    const [editingTags, setEditingTags] = React.useState([]);

    // STATES FOR SORTING ITEMS
    const [sortingOrder, setSortingOrder] = React.useState("desc");


    const handleApiError = useCallback((error, actionType = 'ITEMS_FETCH_FAILURE') => {
        console.error(`{$actionType} error:`, error);
        if (error.status === 401 || error.status === 403) {
            dispatchItems({type: 'ITEMS_AUTH_ERROR', payload: "Authentication faiiled. Please log in again."})
            logout();
            navigate('/login');
        } else {
            dispatchItems({type: actionType, payload: error.message || "An unexpected error occurred!"})
        }
    }, [logout, navigate]);

    const handleFetchItems = useCallback(async () => {
        if (!token) {
            handleApiError(new Error("Token not found"), 'ITEMS_AUTH_ERROR');
            return;
        }

        dispatchItems({type: 'ITEMS_FETCH_INIT'});
        console.log(token);

        try {
            const fetchedItems = await fetchItemsAPI(userId, token);
            dispatchItems({
                type: 'ITEMS_FETCH_SUCCESS',
                payload: fetchedItems,
            });
        } catch (error) {
            handleApiError(error, 'ITEMS_FETCH_FAILURE');
        }
    }, [token, handleApiError, userId]);

    const handleFetchTags = useCallback(async () => {
        if (!token) {
            handleApiError(new Error("Token not found"), 'ITEMS_AUTH_ERROR');
            return;
        }

        try {
            const fetchedTags = await fetchTagsAPI(token);
            dispatchItems({
                type: 'TAGS_FETCH_SUCCESS',
                payload: fetchedTags,
            })
        } catch (error) {
            handleApiError(error, 'ITEMS_FETCH_FAILURE');
        }
    }, [handleApiError, token])


    const handleAddItems = useCallback(async (event) => {
        event.preventDefault();

        if (!newItemText || !newDateText) return;

        if (!token) {
            handleApiError(new Error("Not authenticated: No token found."), 'ITEMS_AUTH_ERROR');
            return;
        }

        try {
            await addItemsAPI({
                userId: userId,
                text: newItemText,
                date: newDateText,
                tags: selectedTags,
                completed: false,
            }, token);
            setNewItemText('');
            setNewDateText('');
            setSelectedTags([])
            await handleFetchItems();
        } catch (error) {
            handleApiError(error, 'ITEMS_ADD_FAILURE');
        }
    }, [newItemText, newDateText, token, handleApiError, userId, selectedTags, handleFetchItems]);

    const handleCompleteItem = useCallback(async (item) => {
        if (!token) {
            handleApiError(new Error("Not authenticated: No token found."), 'ITEMS_AUTH_ERROR');
            return;
        }

        try {
            await updateItemsAPI(item.id, {
                ...item,
                completed: true,
            }, token);
            await handleFetchItems();
        } catch (error) {
            handleApiError(error, 'ITEMS_UPDATE_FAILURE');
        }
    }, [handleFetchItems, token, handleApiError]);

    const handleUnfinishedItem = useCallback(async (item) => {
        if (!token) {
            handleApiError(new Error("Not authenticated: No token found."), 'ITEMS_AUTH_ERROR');
            return;
        }

        try {
            await updateItemsAPI(item.id, {
                ...item,
                completed: false,
            }, token);
            await handleFetchItems();
        } catch (error) {
            handleApiError(error, 'ITEMS_UPDATE_FAILURE');
        }
    }, [handleFetchItems, token, handleApiError]);

    const handleSaveItem = useCallback(async (item) => {
        if (!editingText || !editingDate) return;

        if (!token) { // 1. Check for token
            handleApiError(new Error("Not authenticated: No token found."), 'ITEMS_AUTH_ERROR');
            return;
        }

        try {
            await updateItemsAPI(item.id, {
                ...item,
                text: editingText,
                date: editingDate,
                tags: editingTags,
            }, token);
            setEditingDate('')
            setEditingText('');
            setEditingId(null);
            setEditingTags([]);
            await handleFetchItems();
        } catch (error) {
            handleApiError(error, 'ITEMS_UPDATE_FAILURE');
        }
    }, [editingText, editingDate, token, handleApiError, editingTags, handleFetchItems]);

    const handleDeleteItem = useCallback(async (item) => {
        if (!token) { // 1. Check for token
            handleApiError(new Error("Not authenticated: No token found."), 'ITEMS_AUTH_ERROR');
            return;
        }

        try {
            await deleteItemsAPI(item.id, token);
            await handleFetchItems();
        } catch (error) {
            handleApiError(error, 'ITEMS_DELETE_FAILURE');
        }
    }, [handleFetchItems, token, handleApiError]);

    // TAGS LOGIC
    const handleTagChange = useCallback((selectedTagNames) => {
        const newSelectedTags = itemsState.tags.filter(tag => selectedTagNames.includes(tag.tagName));
        setSelectedTags(newSelectedTags);
    }, [itemsState.tags]);


        //INITIAL FETCH WHEN COMPONEN MOUNTS
    useEffect(() => {
        if (token) {
            handleFetchItems();
            handleFetchTags();
        } else {
            console.log("ToDoListPage: No token found on mount, redirecting to login.")
            logout();
            navigate('/login');
        }
    }, [token, handleFetchItems, logout, navigate, handleFetchTags]);


    //INPUT HANDLERS FOR AddItemForm
    const handleAddItemInput = (event) => setNewItemText(event.target.value);
    const handleAddItemDateInput = (event) => setNewDateText(event.target.value);

    // EDIT ACTION INITIATION
    const handleEditItem = (item) => {
        setEditingId(item.id);
        setEditingDate(item.date);
        setEditingText(item.text);
        setEditingTags(item.tags);
    };

    // CANCEL EDIT
    const handleCancelEditItem = () => {
        setEditingId(null);
        setEditingDate('');
        setEditingText('')
        setEditingTags([])
    };

    // INPUT HANDLERS FOR Item while editing
    const onEditTextInput = (event) => setEditingText(event.target.value);
    const onEditDateInput = (event) => setEditingDate(event.target.value);
    const onEditTag = useCallback((selectedTagNames) => {
        const newSelectedTags = itemsState.tags.filter(tag => selectedTagNames.includes(tag.tagName));
        setEditingTags(newSelectedTags);
    }, [itemsState.tags]);


    // SORTING LOGIC
    const sortedList = useMemo(() => {
        const listToSort = [...itemsState.itemsData];

        if (sortingOrder === 'asc') {
            listToSort.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortingOrder === 'desc') {
            listToSort.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        return listToSort;
    }, [itemsState.itemsData, sortingOrder]);

    // React.useEffect(() => {
    //     handleFetchItems();
    // }, [handleFetchItems])

    if (!token && !!itemsState.isLoading && itemsState.authError) {
        return <p>Redirecting to login... </p>
    }

    return (
        <div>
            <h1>To Do List</h1>

            <AddItemForm addAction={handleAddItems}
                         itemText={newItemText}
                         onAddInput={handleAddItemInput}
                         onDateInput={handleAddItemDateInput}
                         dateText={newDateText}
                         tags={itemsState.tags}
                         onTagSelection={handleTagChange}
                         selectedTags = {selectedTags}
            />

            {itemsState.isLoading && <p>Loading tasks...</p>}
            {itemsState.isError && <p style={{color: 'red'}}>Error fetching tasks. Please try again.</p>}

            <div className={"list-buttons-container"}>
                {itemsState.itemsData.length > 0 && (
                    <>
                        <button type={'button'}
                                onClick={() => setSortingOrder('asc')}
                                disabled={sortingOrder === 'asc'}
                                className={sortingOrder === 'desc' ? (
                                    "list-buttons"
                                ) : (
                                    "list-buttons-disabled"
                                )}>
                            Sort by Date (Oldest First)
                        </button>
                        <button type={'button'}
                                onClick={() => setSortingOrder('desc')}
                                disabled={sortingOrder === 'desc'}
                                className={sortingOrder === 'asc' ? (
                                    "list-buttons"
                                ) : (
                                    "list-buttons-disabled"
                                )}>
                            Sort by Date (Newest First)
                        </button>
                    </>
                )}
            </div>
            <div style={{display: 'flex', gap: '20px'}}>
                <div className={"list-container"}>
                    <h2> Unfinished tasks </h2>
                    <List
                        onCompleteItem={handleCompleteItem}
                        onEditItem={handleEditItem}
                        editingId={editingId}
                        editingText={editingText}
                        editingTags={editingTags}
                        sortingOrder={sortingOrder}
                        onEditTextInput={onEditTextInput}
                        sortedList={sortedList}
                        onSaveItem={handleSaveItem}
                        editingDate={editingDate}
                        onEditDateInput={onEditDateInput}
                        onCancelEditItem={handleCancelEditItem}
                        tags={itemsState.tags}
                        onTagSelection={onEditTag}

                    />
                </div>
                <div className={"list-container"}>
                    <h2>Completed tasks</h2>
                    <ListCompleted
                        list={itemsState.itemsCompletedData}
                        onUnfinishItem={handleUnfinishedItem}
                        onDeleteItem={handleDeleteItem}
                    />
                </div>
            </div>
        </div>
    );


};


export default ToDoListPage;
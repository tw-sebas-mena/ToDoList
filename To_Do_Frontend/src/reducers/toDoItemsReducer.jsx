export const initialState = {
    itemsData: [],
    itemsCompletedData: [],
    isLoading: false,
    isError: false,
    authError: null,
    tags: []
};

export const toDoItemsReducer = (state, action) => {
    switch (action.type) {
        case 'ITEMS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'ITEMS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                itemsData: action.payload.filter((item) => item.completed !== true),
                itemsCompletedData: action.payload.filter((item) => item.completed !== false),
            };
        case 'ITEMS_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'ITEMS_ADD_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
            };
        case 'ITEMS_ADD_FAILURE':
            return {
                ...state,
                isError: true,
                isLoading: false,
            }
        case 'TAGS_FETCH_SUCCESS':
            return {
                ...state,
                tags: action.payload,
                isLoading: false,
                isError: false,
            }
        case 'ITEMS_AUTH_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true,
                authError: action.payload,
                itemsData: [],
                itemsCompletedData: []

            }
        default:
            throw new Error(`Unknown action type: ${action.type}`);

    }
};

export default toDoItemsReducer;

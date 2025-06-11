import axios from 'axios'

const API_ENDPOINT = 'http://localhost:8080/todo'

const getApiClient = (token) => {
    const headers = {};
    if (token){
        headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.create({
        baseURL: API_ENDPOINT,
        headers: headers
    });
};

const handleError = (error) => {
    if (error.response) {
        const newError = new Error(error.response.data?.message || `API Error: ${error.response.statusText || 'Server error'}`);
        newError.status = error.response.status;
        console.error('API Error Response: ', error.response.data, 'Status: ' + error.response.status);
        throw newError;
    } else if (error.request) {
        console.error('API Error Request (No Response): ', error.request);
        throw new Error('Network Error: No response received from server!');
    } else {
        console.error('API Error Message: ', error.message);
        throw new Error(error.message || 'An unexpected error has occurred.');
    }
};

export const fetchItemsAPI = async (itemId, token) => {
    try {
        const apiClient = getApiClient(token);
        const result = await apiClient.get(`/user/${itemId}`);
        return result.data;
    } catch (error) {
        handleError(error)
    }
};

export const addItemsAPI = async (itemData, token) => {
    try {
        const apiClient = getApiClient(token);
        const result = await apiClient.post('', itemData);
        return result.data;
    } catch (error) {
        handleError(error)
    }
}

export const updateItemsAPI = async (itemId, itemData, token) => {
    try {
        const apiClient = getApiClient(token);
        const result = await apiClient.put(`/${itemId}`, itemData);
        return result.data;
    } catch (error) {
        handleError(error)
    }
}

export const deleteItemsAPI = async (itemId, token) => {
    try {
        const apiClient = getApiClient(token);
        const result = await apiClient.delete(`/${itemId}`);
        return result.data;
    } catch (error) {
        handleError(error)
    }
}

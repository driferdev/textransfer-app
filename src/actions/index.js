import { apiGetRoom } from '../services/api';

export const loadRoom = (roomName) => {
    return async (dispatch, _) => {
        dispatch({ type: 'ROOM_LOADED', payload: roomName });
    }
}

export const getRoom = (id) => async (dispatch, _) => {
    return apiGetRoom(id).then((response) => {
        dispatch({ type: 'ROOM_LOADED', payload: response.data });
    }).catch((err) => {
        let message = 'upps something went wrong';
        if(err.response) {
            message = err.response.data.error;
        }
        dispatch({type: 'SHOW_ERROR', payload: message});
    });
}

export const resetRoom = () => async (dispatch, _) => {
    dispatch({ type: 'RESET_ROOM' });
}

export const roomSpinner = (type, show) => {
    return {
        type: type,
        payload: show
    }
}

export const showError = (message) => async (dispatch, _) => {
    dispatch({ type: 'SHOW_ERROR',  payload: message });
}

export const cleanSnackbar = () => async (dispatch, _) => {
    dispatch({ type: 'HIDE_SNACKBAR',  payload: '' });
}

export const handleSnackbar = (type, payload) => async (dispatch, _) => {
    dispatch({ type,  payload});
}

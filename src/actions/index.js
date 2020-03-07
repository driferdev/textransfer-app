import { createRoom, apiGetRoom } from '../services/api';

export const newRoom = (history) => {
    return async (dispatch, _) => {
        dispatch(roomSpinner('SHOW_ROOM_SPINNER', true));
        createRoom().then((response) => {
            dispatch({ type: 'ROOM_LOADED', payload: response.data });
            dispatch(roomSpinner('SHOW_ROOM_SPINNER', false));
            history.push({
                pathname: '/room/'+response.data.room,
            });
        }).catch((err) => {
            dispatch({type: 'SHOW_ERROR', payload: err.response.data.error});
            dispatch(roomSpinner('SHOW_ROOM_SPINNER', false));
        })
    }
}

export const getRoom = (id) => async (dispatch, _) => {
    if(isNaN(id) || id <= 0) {
        return;
    }
    dispatch(roomSpinner('SHOW_GET_ROOM_SPINNER', true));
    apiGetRoom(id).then((response) => {
        dispatch({ type: 'ROOM_LOADED', payload: response.data });
    }).catch((err) => {
        dispatch({type: 'SHOW_ERROR', payload: err.response.data.error});
    }).finally(() => {
        dispatch(roomSpinner('SHOW_GET_ROOM_SPINNER', false));
    });
}

export const roomSpinner = (type, show) => {
    return {
        type: type,
        payload: show
    }
}

export const handleSnackbar = (type, payload) => {
    return { type, payload }
}

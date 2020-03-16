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
            let errMessage = 'Upps something went wrong';
            if(err.response.data.error) {
                errMessage = err.response.data.error;
            }
            dispatch({type: 'SHOW_ERROR', payload: errMessage});
            dispatch(roomSpinner('SHOW_ROOM_SPINNER', false));
        })
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

export const handleSnackbar = (type, payload) => {
    return { type, payload }
}

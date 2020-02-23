import { createRoom, getRoom } from '../services/api';

export const newRoom = (history) => {
    return async (dispatch, _) => {
        dispatch(roomSpinner('SHOW_ROOM_SPINNER', true));
        createRoom().then((response) => {
            dispatch({ type: 'CREATE_ROOM', payload: response.data });
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

export const goToRoom = (id, history) => async (dispatch, _) => {
    if(isNaN(id) || id <= 0) {
        return;
    }
    dispatch(roomSpinner('SHOW_GO_ROOM_SPINNER', true));
    getRoom(id).then((response) => {
        dispatch({ type: 'GO_TO_ROOM', payload: id });
        dispatch(roomSpinner('SHOW_GO_ROOM_SPINNER', false));
        history.push({
            pathname: '/room/'+response.data.room,
        });
    }).catch((err) => {
        dispatch(roomSpinner('SHOW_GO_ROOM_SPINNER', false));
        dispatch({type: 'SHOW_ERROR', payload: err.response.data.error});
    })
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

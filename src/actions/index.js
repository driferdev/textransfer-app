import { createRoom, getRoom } from '../services/api';

export const newRoom = (history) => {
    return async (dispatch, _) => {
        dispatch(roomSpinner('SHOW_ROOM_SPINNER', true));
        createRoom().then((response) => {
            dispatch({ type: 'CREATE_ROOM', payload: response.data });
            dispatch(roomSpinner('SHOW_ROOM_SPINNER', false));
            history.push({
                pathname: '/room',
                state: {
                    roomId: response.data.room.id
                }
            });
        })
    }
}

export const goToRoom = (id, history) => async (dispatch, _) => {
    dispatch(roomSpinner('SHOW_GO_ROOM_SPINNER', true));
    getRoom(id).then((_) => {
        dispatch({ type: 'GO_TO_ROOM', payload: id });
        dispatch(roomSpinner('SHOW_GO_ROOM_SPINNER', false));
        history.push({
            pathname: '/room',
            state: {
                roomId: id
            }
        });
    })
}

export const roomSpinner = (type, show) => {
    return {
        type: type,
        payload: show
    }
}

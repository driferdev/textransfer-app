import { combineReducers } from 'redux';

const newRoomReducer = (_ , action) => {
    let data = {
        id: ''
    }
    if(action.type === 'CREATE_ROOM') {
        data.id = action.payload.room.id;
    }
    return data;
}

const goToRoomReducer = (id = '', action) => {
    if(action.type === 'GO_TO_ROOM') {
        return action.payload;
    }
    return id;
}

const newRoomSpinnerReducer = (show = false, action) => {
    if(action.type === 'SHOW_ROOM_SPINNER') {
        return action.payload;
    }
    return show;
}

const goRoomSpinnerReducer = (show = false, action) => {
    if(action.type === 'SHOW_GO_ROOM_SPINNER') {
        return action.payload;
    }
    return show;
}

const snackBarReducer = (state, action) => {
    if(action.type === 'SHOW_ERROR') {
        return Object.assign({}, state, {
            show: true,
            message: action.payload,
            severity: 'error'
        });
    } else if (action.type === 'SHOW_SUCCESS') {
        return Object.assign({}, state, {
            show: true,
            message: action.payload,
            severity: 'success'
        });
    } else if (action.type === 'HIDE_SNACKBAR') {
        return Object.assign({}, state, {
            show: false,
        });
    }
    return {
        show: false,
        message: '',
        severity: 'success'
    }
}

export default combineReducers({
    newRoom: newRoomReducer,
    goToRoom: goToRoomReducer,
    newRoomSpinner: newRoomSpinnerReducer,
    goRoomSpinner: goRoomSpinnerReducer,
    snackBar: snackBarReducer
})
export const newRoom = () => {
    return {
        type: 'NEW_ROOM_REQUESTED'
    }
}

export const goToRoom = (id) => {
    return {
        type: 'GO_TO_ROOM',
        payload: id
    }
}


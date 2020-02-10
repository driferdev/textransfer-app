import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000'
});

export function createRoom() {
    return instance.get('/room/create');
}

export function getRoom(id) {
    return instance.get(`/room/${id}`);
}
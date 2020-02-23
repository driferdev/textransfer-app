import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export function createRoom() {
    return instance.get('/room/create');
}

export function getRoom(name) {
    return instance.get(`/room/${name}`);
}
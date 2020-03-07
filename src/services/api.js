import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export function createRoom() {
    return instance.get('/room/create');
}

export function apiGetRoom(name) {
    return instance.get(`/room/${name}`);
}
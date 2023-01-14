import config from './utils/envConfig';
import { io } from "socket.io-client";

export const socketUrl = config.WS_URL;

export const createSocket = ({ url, state, actions }) => {
    const socket = io(socketUrl, { auth: { token: state.accessToken }, transports: ['websocket', 'polling'] });
    
    socket.on('connect', () => {
    })

    return socket;
}

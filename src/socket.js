import config from './utils/envConfig';
import { io } from "socket.io-client";

export const socketUrl = config.WS_URL;

export const createSocket = ({ url, state, actions }) => {
    const socket = io(socketUrl, { auth: { token: state.accessToken }, transports: ['websocket', 'polling'] });
    
    socket.on('connect', () => {
        console.log('Connected with id', socket.id, 'and user', state.me.name);   
    })

    if (socket.connected) {
        socket.on('friends', (data) => {
            actions.setFriends(data);
        })

        socket.on('friendOnline', (data) => {
            actions.setOnlineStatus(data)
        });

        socket.on('recieve_message', (message) => {
            actions.recievedMessages(message)
            console.log('MESSAGE RECIEVD', message);
        })

        socket.on('joinedChat', (data) => {
            console.log('JOINED CHAT', data);
        })
    }

    return socket;
}

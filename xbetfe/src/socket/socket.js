import { io } from 'socket.io-client';

// process.env.REACT_APP_FOODIE_URL || 
console.log(process.env.REACT_APP_FOODIE_URL)
const socket = io('http://localhost:4000', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 50,
    transports: ["websocket"]
});

export default socket;
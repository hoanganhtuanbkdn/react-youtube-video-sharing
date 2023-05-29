import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
	process.env.NODE_ENV === 'production'
		? 'https://remitano-api.code4change.dev/chats/1'
		: 'http://localhost:5000/chats/1';

export const socket = io(URL, {
	autoConnect: true,
});

// io.listen(4000);

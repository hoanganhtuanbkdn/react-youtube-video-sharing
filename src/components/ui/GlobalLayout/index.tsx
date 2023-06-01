import { socket } from '@/services/socket';
import { GlobalDispatch, ProfileActions, ProfileSelectors } from '@/store';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../Header';

import { notification } from 'antd';
import { useRouter } from 'next/router';
import { split } from 'ramda';

const GlobalLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isConnected, setIsConnected] = useState(socket.connected);

	const profile = useSelector(ProfileSelectors.selectProfile);

	const router = useRouter();

	const onNewMessages = (value: any) => {
		if (!profile.email) return;
		try {
			const raw = split('{', value);

			const message = JSON.parse(`{${raw?.[1]}`);

			if (profile.email === message?.email) return;

			notification.open({
				message: `${message?.email} shared a movie`,
				description: message?.title,
				onClick: () => {
					router.replace('/');
				},
			});
		} catch (e) {}
	};

	useEffect(() => {
		GlobalDispatch(ProfileActions.getProfileRequest());

		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('some room event', function (msg) {
			// console.log('msg', msg);
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('chat message');
			socket.off('some room event');
		};
	}, []);

	useEffect(() => {
		socket.on('chat message', onNewMessages);
	}, [profile]);

	return (
		<main className={'col scrollbar-md min-h-screen w-screen'}>
			<Header isConnected={isConnected} />
			<div className="container min-h-full">{children}</div>
		</main>
	);
};

export default GlobalLayout;

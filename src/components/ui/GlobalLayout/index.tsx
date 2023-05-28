import { GlobalDispatch, ProfileActions } from '@/store';
import React, { ReactNode, useEffect } from 'react';

import Header from '../Header';

const GlobalLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	useEffect(() => {
		GlobalDispatch(ProfileActions.getProfileRequest());
	}, []);

	return (
		<main className={'col scrollbar-md min-h-screen w-screen'}>
			<Header />
			<div className="container min-h-full">{children}</div>
		</main>
	);
};

export default GlobalLayout;

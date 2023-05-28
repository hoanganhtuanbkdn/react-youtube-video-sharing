import * as React from 'react';

import useLatest from './useLast';

const useWindowResizeListener = (listener: (event: UIEvent) => any) => {
	const latestListener = useLatest(listener);

	React.useLayoutEffect(() => {
		const handler: typeof listener = (event) => {
			latestListener.current(event);
		};

		window.addEventListener('resize', handler);

		return () => {
			window.removeEventListener('resize', handler);
		};
	}, []);
};

export default useWindowResizeListener;

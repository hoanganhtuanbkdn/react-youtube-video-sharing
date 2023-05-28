import * as React from 'react';

import { useRouter } from 'next/router';

const useConfirmGoBackAndClose = ({
	message,
	onOk,
	skip,
}: {
	message: string;
	onOk: () => void;
	skip?: boolean;
}) => {
	const backRouterNameRef = React.useRef('');

	const router = useRouter();

	React.useEffect(() => {
		if (window && !skip) {
			router.beforePopState(({ as }) => {
				if (as !== router.asPath) {
					backRouterNameRef.current = as;
					// Keep address bar with current url before run go back
					if (!!history?.pushState) {
						window.history.pushState({}, 'title', router.asPath);
					} else {
						window.history.replaceState({}, 'title', router.asPath);
					}
					confirmBeforeClose(true);
					return false;
				}

				return true;
			});
		}

		return () => {
			router.beforePopState(() => {
				return true;
			});
		};
	}, [skip]);

	const confirmBeforeClose = React.useCallback((isGoBack?: boolean) => {
		// Alert.confirm(
		// 	{ message, confirmButtonText: 'Có', cancelButtonText: 'Không' },
		// 	() => {
		// 		onOk?.();
		// 		if (isBoolean(isGoBack) && isGoBack) {
		// 			router.replace(backRouterNameRef.current);
		// 		}
		// 	}
		// );
	}, []);

	return { confirmBeforeClose };
};

export default useConfirmGoBackAndClose;

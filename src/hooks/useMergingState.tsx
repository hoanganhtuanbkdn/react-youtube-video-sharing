import { useState } from 'react';

function useMergingState<T>(
	initialState: T
): [T, (p: Partial<T> | ((prevState: T) => Partial<T>)) => void] {
	const [state, setState] = useState<T>(initialState);

	const setMergeState = (
		newState: Partial<T> | ((prevState: T) => Partial<T>)
	) => {
		if (typeof newState === 'function') {
			setState((prevState: T) => ({
				...prevState,
				...newState(prevState),
			}));

			return;
		}
		setState((prevState: T) => ({
			...prevState,
			...newState,
		}));
	};

	return [state, setMergeState];
}

export default useMergingState;

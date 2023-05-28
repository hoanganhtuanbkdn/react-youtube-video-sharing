import * as React from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useLatest = <T,>(value: T) => {
	const ref = React.useRef(value);

	useIsomorphicLayoutEffect(() => {
		ref.current = value;
	});

	return ref;
};

export default useLatest;

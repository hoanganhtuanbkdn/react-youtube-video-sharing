import { useCallback, useState } from 'react';

import { isBoolean } from 'ramda-adjunct';

function useToggle(defaultValue?: boolean): [boolean, any] {
	const [isShowing, setIsShowing] = useState(defaultValue || false);
	const toggle = useCallback((status?: boolean) => {
		setIsShowing((prevStatus) =>
			isBoolean(status) ? status : !prevStatus
		);
	}, []);
	return [isShowing, toggle];
}

export default useToggle;

import { useEffect, useRef } from 'react';

function useEventListenerV2(
	eventName: string,
	handler: (e: KeyboardEvent) => void,
	element?: any
) {
	// Create a ref that stores handler
	const savedHandler: any = useRef();
	// Update ref.current value if handler changes.
	// This allows our effect below to always get latest handler ...
	// ... without us needing to pass it in effect deps array ...
	// ... and potentially cause effect to re-run every render.
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);
	useEffect(
		() => {
			const _element = element ?? window;

			const isSupported = _element && _element?.addEventListener;
			if (!isSupported) return;
			// Create event listener that calls handler function stored in ref
			const eventListener = (event: any) => savedHandler.current(event);
			// Add event listener
			_element?.addEventListener(eventName, eventListener);
			// Remove event listener on cleanup
			return () => {
				_element?.removeEventListener(eventName, eventListener);
			};
		},
		[eventName, element] // Re-run if eventName or element changes
	);
}

export default useEventListenerV2;

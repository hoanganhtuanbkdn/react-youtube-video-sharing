import { EVENT_EMITTER_NAME } from './EventEmitter.constant';

import { isFunction, isNotNilOrEmpty } from 'ramda-adjunct';

class EventRegister {
	static _Listeners: any = {
		count: 0,
		refs: {},
	};

	static addEventListener(
		eventName: EVENT_EMITTER_NAME,
		callback: (data?: any) => void
	) {
		if (isNotNilOrEmpty(eventName) && isFunction(callback)) {
			EventRegister._Listeners.count++;
			const eventId = 'l' + EventRegister._Listeners.count;
			EventRegister._Listeners.refs[eventId] = {
				name: eventName,
				callback,
			};
			return eventId;
		}

		return false;
	}

	static removeEventListener(id: string) {
		if (id) {
			return delete EventRegister._Listeners.refs[id];
		}
		return false;
	}

	static removeAllListeners() {
		let removeError = false;
		Object.keys(EventRegister._Listeners.refs).forEach((_id) => {
			const removed = delete EventRegister._Listeners.refs[_id];
			removeError = !removeError ? !removed : removeError;
		});
		return !removeError;
	}

	static emitEvent(eventName: EVENT_EMITTER_NAME, data: any) {
		Object.keys(EventRegister._Listeners.refs).forEach((_id) => {
			if (
				EventRegister._Listeners.refs[_id] &&
				eventName === EventRegister._Listeners.refs[_id].name
			)
				EventRegister._Listeners.refs[_id].callback(data);
		});
	}

	/*
	 * shortener
	 */
	static on(eventName: EVENT_EMITTER_NAME, callback: () => void) {
		return EventRegister.addEventListener(eventName, callback);
	}

	static rm(eventName: EVENT_EMITTER_NAME) {
		return EventRegister.removeEventListener(eventName);
	}

	static rmAll() {
		return EventRegister.removeAllListeners();
	}

	static emit(eventName: EVENT_EMITTER_NAME, data?: any) {
		EventRegister.emitEvent(eventName, data);
	}
}

export { EVENT_EMITTER_NAME, EventRegister };

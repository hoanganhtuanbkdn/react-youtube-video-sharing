import { ServiceApi } from '@/services';
import { setApiAuthorization } from '@/services/api.util';
import {
	deleteCookieAfterLogout,
	getAccessToken,
	isSuccess,
} from '@/utils/Api.util';

import { AuthActions } from '../Auth';
import { ProfileActions } from './Profile.redux';

import { isNilOrEmpty } from 'ramda-adjunct';
import { all, put } from 'redux-saga/effects';

export function* getMyProfile(): Generator<unknown, void, { data: any }> {
	try {
		const token = getAccessToken();

		if (isNilOrEmpty(token)) {
			yield put(ProfileActions.getProfileFailure());
			return;
		}

		setApiAuthorization(token);

		const profile = yield ServiceApi.getUserMe();

		console.log(4, profile);

		if (isSuccess(profile)) {
			console.log(5, profile?.data);
			yield put(ProfileActions.getProfileSuccess(profile?.data));
		} else {
			yield all([
				put(ProfileActions.getProfileFailure()),
				put(AuthActions.resetAuth()),
			]);
			deleteCookieAfterLogout();
		}
	} catch (error) {
		yield all([
			put(ProfileActions.getProfileFailure()),
			put(AuthActions.resetAuth()),
		]);
		deleteCookieAfterLogout();
	}
}

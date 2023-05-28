import { AuthActions, loginRequest, logout, registerRequest } from './Auth';
import { GeneralActions, getGeneral } from './General';
import { getMyProfile, ProfileActions } from './Profile';

import { all, takeEvery } from 'redux-saga/effects';
/* ------------- Connect Types To Sagas ------------- */
export default function* rootSaga() {
	yield all([
		// auth
		takeEvery(AuthActions.logoutRequest.type, logout),
		takeEvery(AuthActions.loginRequest.type, loginRequest),
		takeEvery(AuthActions.registerRequest.type, registerRequest),

		// profile
		takeEvery(ProfileActions.getProfileRequest.type, getMyProfile),
		// General
		takeEvery(GeneralActions.getGeneralRequest.type, getGeneral),
	]);
}

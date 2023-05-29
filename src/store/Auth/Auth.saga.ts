import { ServiceApi } from '@/services';
import { setApiAuthorization } from '@/services/api.util';
import { deleteCookieAfterLogout, isSuccess, setAuthCookie } from '@/utils';
import { PayloadAction } from '@reduxjs/toolkit';

import { ProfileActions } from '../Profile';
import { AuthActions } from './Auth.redux';

import { message } from 'antd';
import { NextRouter } from 'next/router';
import { all, put } from 'redux-saga/effects';

export function* logout(action: PayloadAction<NextRouter>): any {
	yield put(ProfileActions.resetProfile());
	deleteCookieAfterLogout();
	action.payload?.replace('/');
}
export function* loginRequest(
	action: PayloadAction<{ email: string; password: string }>
): any {
	try {
		const res = yield ServiceApi.login(action.payload);
		if (isSuccess(res)) {
			setApiAuthorization(res.data.token);
			setAuthCookie({ token: res.data.token });
			yield all([
				put(AuthActions.loginSuccess(res.data?.token)),
				put(AuthActions.setShowAuthModal({ status: false })),
				put(ProfileActions.getProfileRequest()),
			]);
		} else {
			message.error('Email or password is incorrect');
			yield put(AuthActions.loginFailure());
		}
	} catch (e: any) {
		message.error(e?.message);
		yield put(AuthActions.loginFailure());
	}
}

export function* registerRequest(
	action: PayloadAction<{ email: string; password: string }>
): any {
	try {
		const res = yield ServiceApi.register(action.payload);
		if (isSuccess(res)) {
			setApiAuthorization(res.data.token);
			setAuthCookie({ token: res.data.token });
			yield all([
				put(AuthActions.registerSuccess(res.data?.token)),
				put(AuthActions.setShowAuthModal({ status: false })),
				put(ProfileActions.getProfileRequest()),
			]);
		} else {
			message.error(
				res?.data?.error?.message ?? 'Email or password is incorrect'
			);
			yield put(AuthActions.loginFailure());
		}
	} catch (e: any) {
		message.error(e?.message);
		yield put(AuthActions.loginFailure());
	}
}

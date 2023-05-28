import { insertObjectIf } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

const initialState: IAuthState = {
	fetching: false,
	token: null,
	isShowAuthModal: false,
	authModalType: 'LOGIN',
};

type IAuthState = {
	fetching: boolean;
	isShowAuthModal: boolean;
	token: string | null;
	authModalType: 'LOGIN' | 'REGISTER';
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setShowAuthModal: (
			state: IAuthState,
			action: PayloadAction<{
				status: boolean;
				type?: 'LOGIN' | 'REGISTER';
			}>
		) => {
			return {
				...state,
				isShowAuthModal: action.payload.status,
				...insertObjectIf(action.payload.type, {
					authModalType: action.payload.type,
				}),
			};
		},
		loginRequest: (
			state: IAuthState,
			action: PayloadAction<{ email: string; password: string }>
		) => {
			return {
				...state,
				fetching: true,
			};
		},
		loginSuccess: (state: IAuthState, action: PayloadAction<string>) => {
			return {
				...state,
				fetching: false,
				logged: true,
				token: action.payload,
			};
		},
		loginFailure: (state: IAuthState) => {
			return {
				...state,
				logged: false,
				fetching: false,
			};
		},
		registerRequest: (
			state: IAuthState,
			action: PayloadAction<{ email: string; password: string }>
		) => {
			return {
				...state,
				fetching: true,
			};
		},
		registerSuccess: (state: IAuthState, action: PayloadAction<string>) => {
			return {
				...state,
				fetching: false,
				logged: true,
				token: action.payload,
			};
		},
		registerFailure: (state: IAuthState) => {
			return {
				...state,
				logged: false,
				fetching: false,
			};
		},
		logoutRequest: (state: IAuthState) => {
			return {
				...state,
				logged: false,
				token: null,
				fetching: false,
			};
		},
		resetAuth: (state: IAuthState) => {
			return {
				...state,
				...initialState,
			};
		},
	},
});

// Selectors
export const AuthSelector = {
	selectAuthState: (state: RootState) => ({
		...state.auth,
	}),
	selectToken: (state: RootState) => state.auth.token,
};

export const AuthActions = authSlice.actions;
export const AuthReducer = authSlice.reducer;

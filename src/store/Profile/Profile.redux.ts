import { IUser } from '@/services';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

const initialState: IProfileState = {
	fetching: true,
	profile: null,
};

type IProfileState = {
	fetching: boolean;
	profile: IUser | null;
};
const profileSlice = createSlice({
	initialState,
	name: 'profile',
	reducers: {
		getProfileRequest: (state) => ({ ...state, fetching: true }),
		getProfileSuccess: (state, action: PayloadAction<any>) => ({
			...state,
			fetching: false,
			profile: action.payload,
		}),
		getProfileFailure: (state) => ({
			...state,
			fetching: false,
			profile: null,
		}),
		resetProfile: (state) => ({
			...state,
			...initialState,
		}),
		checkAccountRequest: (state) => ({ ...state, fetching: true }),
	},
});

export const ProfileSelectors = {
	selectProfile: (state: RootState) => ({
		...state.profile.profile,
		profileFetching: state.profile.fetching,
	}),
};

export const ProfileActions = profileSlice.actions;
export const ProfileReducer = profileSlice.reducer;

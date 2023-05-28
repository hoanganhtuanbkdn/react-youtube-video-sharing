import { createSlice } from '@reduxjs/toolkit';

const initialState: IGeneralState = {
	fetching: false,
};
type IGeneralState = {
	fetching: boolean;
};
export const GeneralSelectors = {
	// selectPackages: (state: RootState) => state.general.packages,
};

const generalSlice = createSlice({
	initialState,
	name: 'General',
	reducers: {
		getGeneralRequest: (state) => ({
			...state,
			fetching: true,
		}),
		getGeneralSuccess: (state) => ({
			...state,
			fetching: false,
		}),
		getGeneralFailure: (state) => ({
			...state,
			fetching: false,
		}),
	},
});

export const GeneralActions = generalSlice.actions;
export const GeneralReducer = generalSlice.reducer;

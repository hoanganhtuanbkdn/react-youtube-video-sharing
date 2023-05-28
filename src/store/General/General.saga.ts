import { GeneralActions } from './General.redux';

import { all, put } from 'redux-saga/effects';

export function* getGeneral(): Generator<unknown, void, { data: any }> {
	try {
		// const packages = yield ServiceApi.getPackages();
		// if (isSuccess(packages)) {
		// 	yield put(
		// 		GeneralActions.getGeneralSuccess({ packages: packages?.data })
		// 	);
		// } else {
		// 	yield all([put(GeneralActions.getGeneralFailure())]);
		// }
	} catch (error) {
		yield all([put(GeneralActions.getGeneralFailure())]);
	}
}

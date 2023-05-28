import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { store } from './Store.redux';

export * from './Auth';
export * from './Profile';
export * from './Store.redux';

export type RootState = ReturnType<typeof store.getState>;
export const GlobalDispatch = store.dispatch;

export type AppDispatch = typeof GlobalDispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

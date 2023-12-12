import { Action, ThunkAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useUntypedDispatch,
  useSelector as useUntypedSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import authReducer from './features/auth/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useUntypedDispatch;

// export const useAppDispatch = (): ThunkDispatch<RootState, any, AuthAction> => useUntypedDispatch()
export const useAppSelector: TypedUseSelectorHook<RootState> = useUntypedSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

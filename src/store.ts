import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import openstreetmapReducer from './stores/openstreetmap-slice'


export const store = configureStore({
  reducer: {
    openstreetmap: openstreetmapReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

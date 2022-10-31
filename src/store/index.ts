import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { gameSlice, } from "./slices/gameSlice"
import { createWrapper } from "next-redux-wrapper"

export const makeStore = () =>
  configureStore({
    reducer: {
      [gameSlice.name]: gameSlice.reducer,
    },
    devTools: true,
  })


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });


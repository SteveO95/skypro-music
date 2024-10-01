import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playlistReducer } from "./features/playlistSlice";
import { userReducer } from "./features/userSlice";
import { filterReducer } from "./features/filtersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      playlist: playlistReducer,
      user: userReducer,
      filters: filterReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

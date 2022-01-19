import {
  Action,
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import layoutReducer from "../features/layout/layout-slice";
import { solutionDeskApi } from "./solutionDeskApi";

let store: CombinedState<any>;
const combinedReducer = combineReducers({
  layout: layoutReducer,
  [solutionDeskApi.reducerPath]: solutionDeskApi.reducer,
});

const reducer: CombinedState<any> = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const store = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return store;
  } else {
    store = combinedReducer(state, action);
    return store;
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(solutionDeskApi.middleware),
  });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
export const wrapper = createWrapper(makeStore, { debug: true });

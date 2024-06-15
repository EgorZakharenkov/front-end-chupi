"use client";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/redux/rootReducers";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
});

export { store };
export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

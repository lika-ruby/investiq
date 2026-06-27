import { store } from "../store";

export const selectUser = () => store.getState().auth.user;
export const selectIsAuth = () => Boolean(store.getState().auth.user);
export const selectAuthLoading = () => store.getState().auth.loading;
export const selectAuthError = () => store.getState().auth.error;
export const selectOperations = () => store.getState().auth.user?.operations;
export const selectStartingBalance = () =>
  store.getState().auth.user?.startingBalance ?? 0;

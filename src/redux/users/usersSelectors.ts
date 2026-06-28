import type { RootState } from "../store";
import type { Operation } from "../types/auth";

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsAuth = (state: RootState) => Boolean(state.auth.user);

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectOperations = (state: RootState): Operation[] =>
  state.auth.user?.operations ?? [];

export const selectStartingBalance = (state: RootState): number =>
  state.auth.user?.startingBalance ?? 0;

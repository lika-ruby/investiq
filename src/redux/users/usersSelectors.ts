export const selectUser = (state: any) => state.auth.user;

export const selectIsAuth = (state: any) => Boolean(state.auth.user);

export const selectAuthLoading = (state: any) => state.auth.loading;

export const selectAuthError = (state: any) => state.auth.error;

export const selectOperations = (state: any) =>
  state.auth.user?.operations ?? [];

export const selectStartingBalance = (state: any) =>
  state.auth.user?.startingBalance ?? 0;

import { createSlice } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import { addOperation } from "./usersOperations";

export interface Operation {
  id: string;
  date: string;
  desc: string;
  category: string;
  sum: number;
  type: "expense" | "income";
}

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  startingBalance: number;
  operations: Operation[];
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser(state, action) {
      const user = action.payload;

      state.user = user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            startingBalance: user.startingBalance || 0,
            operations: user.operations || [],
          }
        : null;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    updateName(state, action) {
      if (state.user) {
        state.user.displayName = action.payload;
      }
    },
    setOperation(state, action) {
      if (state.user) {
        state.user.operations.push(action.payload);
      }
    },
    removeOperation(state, action) {
      if (state.user) {
        state.user.operations = state.user.operations.filter(
          (op) => op.id !== action.payload
        );
      }
    },
    setStartingBalance(state, action) {
      if (state.user) {
        state.user.startingBalance = action.payload;
      }
    },
  },
});

export const {
  setUser,
  updateName,
  setLoading,
  setError,
  logout,
  setOperation,
  removeOperation,
  setStartingBalance,
} = authSlice.actions;

export default authSlice.reducer;

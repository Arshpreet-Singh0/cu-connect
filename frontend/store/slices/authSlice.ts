import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
  success : boolean;
  
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  success : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    clearStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
});

export const { clearError, setUser, clearUser, clearStatus } = authSlice.actions;
export default authSlice.reducer;

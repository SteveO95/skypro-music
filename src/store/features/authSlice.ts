import { getJWTokens, login } from "@/services/api";
import { deleteAuthCookie, setAuthCookie } from "@/services/cookie";
import { AuthType } from "@/types/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthStateType = {
  isAuth: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  username: string | undefined;
  email: string | undefined;
  id: string | undefined;
};

export const setUserAuth = createAsyncThunk(
  "auth/setUserAuth",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const loginResult = await login({ email, password });
      const tokenResult = await getJWTokens({ email, password });
      const authData = {
        id: loginResult._id,
        email: loginResult.email,
        username: loginResult.username,
        accessToken: tokenResult.access,
        refreshToken: tokenResult.refresh,
      };
      dispatch(setAuth(authData));
      return authData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

export const setUserLogout = createAsyncThunk("auth/setUserLogout", async (_, { dispatch }) => {
  dispatch(unsetAuth());
});

const initialState: AuthStateType = {
  isAuth: false,
  accessToken: undefined,
  refreshToken: undefined,
  username: undefined,
  email: undefined,
  id: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthType>) => {
      state.isAuth = true;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      setAuthCookie(
        {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
        { maxAge: 12 * 3600 }
      );
    },
    unsetAuth: (state) => {
      state.isAuth = initialState.isAuth;
      state.id = initialState.id;
      state.username = initialState.username;
      state.email = initialState.email;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      deleteAuthCookie();
    },
  },
  extraReducers(builder) {
    builder.addCase(setUserAuth.rejected, (state, action) => {});
  },
});

const { unsetAuth } = authSlice.actions;
export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;

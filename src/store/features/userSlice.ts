import { getTokens, signInUser, signUpUser } from "@/api/playlist";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userData: { email: string; password: string }) => {
    const user = await signInUser(userData);
    return user;
  }
);

export const regUser = createAsyncThunk(
  "user/regUser",
  async (userData: { email: string; password: string; username: string }) => {
    const user = await signUpUser(userData);
    return user;
  }
);

//создать getToken
export const getTokensState = createAsyncThunk(
  "token/getTokens",
  async (userData: { email: string; password: string }) => {
    const tokens = await getTokens(userData);
    return tokens;
  }
);

type TokensType = {
  access: string;
  refresh: string;
};

type UserType = {
  _id: number;
  username: string;
  email: string;
};

type UserStateType = {
  user: UserType | null;
  tokens: TokensType | null;
};

const isBrowser = typeof window !== "undefined";

const loadUserFromLocalStorage = (): UserStateType => {
  if (!isBrowser) return { user: null, tokens: null };

  const user = localStorage.getItem("user");
  const tokens = localStorage.getItem("tokens");

  return {
    user: user ? JSON.parse(user) : null,
    tokens: tokens ? JSON.parse(tokens) : null,
  };
};

const saveUserToLocalStorage = (state: UserStateType) => {
  if (!isBrowser) return;

  localStorage.setItem("user", JSON.stringify(state.user));
  localStorage.setItem("tokens", JSON.stringify(state.tokens));
};

const clearUserFromLocalStorage = () => {
  if (!isBrowser) return;

  localStorage.removeItem("user");
  localStorage.removeItem("tokens");
};

const initialState: UserStateType = loadUserFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      clearUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    // Обрабатываем экшены, связанные с нашим асинхронным thunk
    builder
      // Обработка успешного выполнения асинхронного экшена getUser
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload; // Обновляем состояние пользователя данными из action.payload
        saveUserToLocalStorage(state);
      })
      // Обработка неудачного выполнения асинхронного экшена getUser
      .addCase(getUser.rejected, (state, action) => {
        console.error("Error:", action.error.message); // Выводим сообщение об ошибке в консоль
      })
      .addCase(getTokensState.fulfilled, (state, action) => {
        state.tokens = action.payload;
        saveUserToLocalStorage(state);
      })
      .addCase(getTokensState.rejected, (state, action) => {
        console.error("Error:", action.error.message);
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../services/axios';
import local from '../utils/localStorage';

interface Account {
  username: string;
  password: string;
}

interface LoginState {
  isLogged: boolean;
  isLoading: boolean;
  error: string;
  accessToken: string | null;
  userInfo: object;
}

const initialState: LoginState = {
  isLogged: false,
  isLoading: false,
  error: '',
  accessToken: null,
  userInfo: {},
};

export const loginInClient = createAsyncThunk(
  'login/loginInClient',
  async (data: Account, thunkAPI) => {
    try {
      const response = await axios.post('/login', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
        state.isLogged = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isLogged = false;
      local.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginInClient.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginInClient.fulfilled, (state, action: any) => {
        state.isLogged = true;
        state.isLoading = false;
        state.error = '';
        state.accessToken = action.payload?.accessToken;
        state.userInfo = action.payload?.user;
        local.add('user', JSON.stringify(action.payload?.user));
        local.add(
          'accessToken',
          JSON.stringify(action.payload?.accessToken)
        );
        local.add(
          'refreshToken',
          JSON.stringify(action.payload?.refreshToken)
        );
      })
      .addCase(loginInClient.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;

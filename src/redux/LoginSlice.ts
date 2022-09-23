import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../services/axios';
import localStorage from '../helper/localStorage'

interface Account {
  username: string;
  password: string;
}

interface LoginState {
  isLoading: boolean;
  isAuth: boolean;
  error: string;
  accessToken: string | null;
  userInfo:object
}

const initialState: LoginState = {
  isLoading: false,
  isAuth: localStorage.get('accessToken') ? true : false,
  error: '',
  accessToken:  null,
  userInfo:  {}
};

export const loginInClient = createAsyncThunk(
  'login/loginInClient',
  async (data: Account, thunkAPI) => {
    try {
     const response =  await axios.post('/login', data);
     return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
    },
    logout: (state) => {
        state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginInClient.pending, (state,action) => {
        state.isLoading = true;
      })
      .addCase(loginInClient.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = '';
        state.accessToken = action.payload?.accessToken;
        state.userInfo = action.payload?.user;
        localStorage.add('user',JSON.stringify(action.payload?.user))
        localStorage.add('accessToken',JSON.stringify(action.payload?.accessToken))
      })
      .addCase(loginInClient.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.isAuth = false;
      });
  },
});

export default loginSlice.reducer;
export const { login,logout } = loginSlice.actions;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthActionTypes, AuthState } from './types';

import {
  FIREBASE_API_AUTH_SIGN_IN_URL,
  FIREBASE_API_AUTH_SIGN_UP_URL,
  FIREBASE_AUTH_BASE_URL,
} from '@/constants/firebase';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const signIn = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_IN}`,
  async (payload: { email: string; password: string }, thunkApi) => {
    try {
      // TODO: Aquí es donde llamamos al servicio Login para la Autenticación / Api / Base de datos
      const response = await fetch(`${FIREBASE_AUTH_BASE_URL}${FIREBASE_API_AUTH_SIGN_IN_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        return thunkApi.rejectWithValue(data.error.message);
      }
      return data;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue({ error });
    }
  }
);

export const signUp = createAsyncThunk(
  `auth/${AuthActionTypes.SIGN_UP}`,
  async (payload: { email: string; password: string }, thunkApi) => {
    try {
      // TODO: Aquí es donde llamamos al servicio de registro para la Autenticación / Api / Base de datos
      const response = await fetch(`${FIREBASE_AUTH_BASE_URL}${FIREBASE_API_AUTH_SIGN_UP_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) return thunkApi.rejectWithValue(data.error.message);

      return data;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue({ error });
    }
  }
);

export const signOut = createAsyncThunk(`auth/${AuthActionTypes.SIGN_OUT}`, async (_, thunkApi) => {
  try {
    // TODO: Aquí es donde llamamos al servicio Login para la Autenticación / Api / Base de datos

    /* const response = await fetch('http://localhost:3000/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
  
        const data = await response.json() */
    return thunkApi.fulfillWithValue(null);
  } catch (error: unknown) {
    return thunkApi.rejectWithValue({ error });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.isError = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isError = true;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = '';
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isError = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = '';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = '';
        state.isError = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;

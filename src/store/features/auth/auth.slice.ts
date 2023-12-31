import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AuthActionTypes, AuthState } from './types';

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
      const response = await auth().signInWithEmailAndPassword(payload.email, payload.password);

      

      return response.user;
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

      const response = await auth().createUserWithEmailAndPassword(payload.email, payload.password);

      return response.user;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue({ error });
    }
  }
);

export const signOut = createAsyncThunk(`auth/${AuthActionTypes.SIGN_OUT}`, async (_, thunkApi) => {
  try {
    // TODO: Aquí es donde llamamos al servicio Login para la Autenticación / Api / Base de datos

    await auth().signOut();
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

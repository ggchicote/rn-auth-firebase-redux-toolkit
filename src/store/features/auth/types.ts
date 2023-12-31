import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  RESTORE_TOKEN = 'RESTORE_TOKEN',
}

export type AuthUser = FirebaseAuthTypes.User | null;

export type AuthState = {
  user: AuthUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string | null | unknown;
};

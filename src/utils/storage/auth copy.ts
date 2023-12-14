import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthUser } from '@/store/features/auth/types';

export class AuthStorage {
  namespace: string;

  constructor(namespace = 'firebase_auth') {
    this.namespace = namespace;
  }

  async isAuthenticated(): Promise<boolean> {
    const rawUser: string | null = await AsyncStorage.getItem(`${this.namespace}:user`);

    return !!(rawUser && JSON.parse(rawUser).isAuthenticated);
  }

  async getUser() {
    try {
      const rawUser: string | null = await AsyncStorage.getItem(`${this.namespace}:user`);

      return rawUser ? JSON.parse(rawUser) : '';
    } catch (e) {
      console.log('Auth storage util error:', e);
    }
  }

  async setUser(user: AuthUser) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:user`, JSON.stringify(user));
    } catch (e) {
      console.log('Auth storage util error:', e);
    }
  }

  async clearUser() {
    await AsyncStorage.removeItem(`${this.namespace}:user`);
  }
}

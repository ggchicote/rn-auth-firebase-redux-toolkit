import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

import { useAppSelector } from '@/store';
import { AuthState } from '@/store/features/auth/types';

const RootNavigator = (): JSX.Element => {
  const auth = useAppSelector<AuthState>((state) => state.auth);

  const { isAuthenticated } = auth;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;

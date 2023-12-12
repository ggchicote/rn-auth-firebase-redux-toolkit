import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '@/screens';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = (): JSX.Element => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerBackTitleVisible: false, headerTitleAlign: 'center' }}>
      <AuthStack.Screen component={SignIn} name="SignIn" />
      <AuthStack.Screen component={SignUp} name="SignUp" />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

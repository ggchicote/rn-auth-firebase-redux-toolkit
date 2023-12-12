import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '@/screens';

const AppStack = createStackNavigator();

const AppNavigator = (): JSX.Element => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen component={Home} name="Home" />
    </AppStack.Navigator>
  );
};

export default AppNavigator;

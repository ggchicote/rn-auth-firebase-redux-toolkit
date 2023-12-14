import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { RootNavigator } from '@/navigators';
import { store } from '@/store';
//SplashScreen.preventAutoHideAsync();

export default function App() {
  /*   const stopSplashScreen = async () => {
    SplashScreen.hideAsync();
  }; */

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={styles.appContainer}>
          <RootNavigator />
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

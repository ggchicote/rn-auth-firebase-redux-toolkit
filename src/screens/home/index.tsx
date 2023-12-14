import { View, Text, Button } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store';
import { signOut } from '@/store/features/auth/auth.slice';
import { AuthUser } from '@/store/features/auth/types';

const HomeScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector<AuthUser | null>((state) => state.auth.user);
  const onHandleSignOut = () => {
    dispatch(signOut());
  };

  // console.warn({ user });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen!</Text>
      <Button title="Logout" onPress={onHandleSignOut} />
    </View>
  );
};

export default HomeScreen;

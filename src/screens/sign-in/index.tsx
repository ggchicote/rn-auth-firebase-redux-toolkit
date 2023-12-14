import { StackScreenProps } from '@react-navigation/stack';
import { useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { StyledInput } from '@/components';
import { onChangeProps, onBlurProps, onFocusProps } from '@/components/styled-input';
import { useForm } from '@/hooks';
import { FormState } from '@/hooks/useForm';
import { AuthStackParamList } from '@/navigators/AuthNavigator';
import { useAppSelector, useAppDispatch } from '@/store';
import { signIn } from '@/store/features/auth/auth.slice';
import { AuthState } from '@/store/features/auth/types';

const initialState: FormState = {
  email: {
    value: '',
    error: '',
    hasError: false,
    name: 'email',
    active: false,
    isFormValid: false,
  },
  password: {
    value: '',
    error: '',
    hasError: false,
    name: 'password',
    active: false,
    isFormValid: false,
  },
};

type Props = StackScreenProps<AuthStackParamList, 'SignIn'>;

export default function SignInScreen(_props: Props) {
  const { navigation } = _props;

  const dispatch = useAppDispatch();
  const auth = useAppSelector<AuthState>((state) => state.auth);

  useEffect(() => {
    if (auth.isError) {
      Alert.alert('Error', auth.error);
    }
  }, [auth]);

  const { formState, onChange, isFormValid } = useForm(initialState);

  const onBlur = ({ name }: onBlurProps): void => {
    //  console.warn({ event: 'onBlur', name });
  };
  const onHandleChange = ({ text, name }: onChangeProps): void => {
    onChange({ text, name });
  };
  const onFocus = ({ name }: onFocusProps): void => {
    // console.warn({ event: 'onFocus', name });
  };

  const onHandleSignIn = () => {
    dispatch(signIn({ email: formState.email.value, password: formState.password.value }));
  };

  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <View style={styles.formContainer}>
        <StyledInput
          name={formState.email.name}
          onBlur={onBlur}
          onChange={onHandleChange}
          onFocus={onFocus}
          placeholder="thisisnotmyre@lemail.com"
          value={formState.email.value}
          label="Email"
          active={formState.email.active}
          error={formState.email.error}
          hasError={formState.email.hasError}
          keyboardType="email-address"
          autoCorrect={false}
        />
        <StyledInput
          name={formState.password.name}
          onBlur={onBlur}
          onChange={onHandleChange}
          onFocus={onFocus}
          placeholder="********"
          value={formState.password.value}
          label="Password"
          active={formState.password.active}
          error={formState.password.error}
          hasError={formState.password.hasError}
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Don't have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isFormValid}
          onPress={onHandleSignIn}
          style={isFormValid ? styles.signInButton : styles.disabledSignInButton}>
          <Text style={styles.signInTextButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

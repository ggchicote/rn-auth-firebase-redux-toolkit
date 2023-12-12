import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  KeyboardType,
} from 'react-native';

import { styles } from './styles';

export type onChangeProps = {
  text: string;
  name: string;
};

export type onBlurProps = {
  name: string;
};

export type onFocusProps = {
  name: string;
};

/* interface StyledInputProps extends TextInputProps {
  onCustomChange: ({ text, name }: onChangeProps) => void;
  name: string;
} */

type StyledInputProps = {
  onChange: ({ text, name }: onChangeProps) => void;
  onFocus: ({ name }: onFocusProps) => void;
  onBlur: ({ name }: onBlurProps) => void;
  name: string;
  value: string;
  placeholder: string;
  label: string;
  error: string;
  hasError: boolean;
  active: boolean;
  autoCorrect?: boolean;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
};

export default function StyledInput(_props: StyledInputProps): JSX.Element {
  const {
    placeholder,
    value,
    name,
    onChange,
    onFocus,
    onBlur,
    label,
    error,
    hasError,
    active,
    ...rest
  } = _props;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => onChange({ text, name })}
            onFocus={() => onFocus({ name })}
            onBlur={() => onBlur({ name })}
            {...rest}
          />
          {hasError ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

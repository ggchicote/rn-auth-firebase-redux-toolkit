import { useReducer } from 'react';

import { onChangeProps } from '@/components/styled-input';
import { validateInput } from '@/functions';

type InputState = {
  value: string;
  error: string;
  hasError: boolean;
  active: boolean;
  name: string;
  isFormValid: boolean;
};

enum InputActions {
  INPUT_CHANGE = 'INPUT_CHANGE',
  INPUT_BLUR = 'INPUT_BLUR',
  INPUT_FOCUS = 'INPUT_FOCUS',
  CLEAR_INPUT = 'CLEAR_INPUT',
  SET_INPUT = 'SET_INPUT',
}

type FormAction = {
  type: InputActions;
  data: InputState;
};

export type FormState = {
  [key: string]: InputState;
};

const formReducer = (state: FormState, action: FormAction) => {
  const { type, data } = action;

  switch (type) {
    case InputActions.INPUT_CHANGE:
      return {
        ...state,
        [data.name]: {
          ...state[data.name],
          value: data.value,
          error: data.error,
          hasError: data.hasError,
          active: data.active,
          isFormValid: data.isFormValid,
        },
      };
    default:
      return state;
  }
};

export default function useForm(initialState: FormState) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const onChange = ({ text, name }: onChangeProps) => {
    const { error, hasError } = validateInput({ value: text, name });

    dispatch({
      type: InputActions.INPUT_CHANGE,
      data: {
        value: text,
        name,
        error,
        hasError,
        active: true,
        isFormValid: !hasError,
      },
    });
  };

  const validateForm = (): boolean => {
    let isValid = true;
    Object.keys(state).forEach((key) => {
      if (!state[key].isFormValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  return {
    onChange,
    formState: state,
    isFormValid: validateForm(),
  };
}

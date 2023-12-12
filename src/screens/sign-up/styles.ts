import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    padding: 20,
    gap: 15,
    justifyContent: 'center',
  },
  signInButton: {
    padding: 20,
    backgroundColor: '#EC5B70',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSignInButton: {
    padding: 20,
    backgroundColor: '#E3E3E3',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    paddingVertical: 20,
    marginHorizontal: 20,
  },

  signInTextButton: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
  },
  linkContainer: {
    marginBottom: 20,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF8552',
    textDecorationLine: 'underline',
  },
});

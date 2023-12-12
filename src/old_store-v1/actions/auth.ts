import { Dispatch } from 'react'
import { AuthFormValues, AuthAction, AuthActionTypes, AuthUser } from '../types'

export const signIn = ({ email, password }: AuthFormValues) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {

      // TODO: Aquí es donde llamamos al servicio Login para la Autenticación / Api / Base de datos 
      dispatch({ type: AuthActionTypes.SIGN_IN_REQUEST })

      /* const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json() */

      console.warn({ email, password })
       const data: AuthUser = {
        token: '123',
      } 
      if (!data) {
        dispatch({ type: AuthActionTypes.SIGN_IN_FAILURE, payload: 'Error' })
        return;
      }

      dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: AuthActionTypes.SIGN_IN_FAILURE, payload: 'Error' })
    }
  }
}


export const signOut = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      // TODO: aquí es donde llamamos el API / Servicio de Logout
      dispatch({type:AuthActionTypes.SIGN_OUT_REQUEST})

      //TODO: 
      /* const response = await fetch('http://localhost:3000/api/signout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json() */
      dispatch({type:AuthActionTypes.SIGN_OUT_SUCCESS})
    } catch (error) {
      dispatch({type:AuthActionTypes.SIGN_OUT_FAILURE, payload: `Error: ${error}`})
    }
  }
}
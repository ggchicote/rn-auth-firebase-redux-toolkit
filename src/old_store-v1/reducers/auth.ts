import { AuthActionTypes, AuthState, AuthAction } from "../types"
 
const initialState: AuthState = {
  user:null,
  isAuthenticated:false,
  isLoading:false,
  isError:false,
  error:null
}


export const authReducer = (state = initialState, action : AuthAction):AuthState => {

  switch(action.type) {
    case AuthActionTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading:true
      }
      case AuthActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        user:action.payload,
        isLoading:false,
        isAuthenticated:true
      }
      case AuthActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading:false,
        isError:true,
        error:action.payload,
        isAuthenticated:false,
      }
      case AuthActionTypes.SIGN_OUT_REQUEST:
      return {
        ...state,
        isLoading:true,
      }
      case AuthActionTypes.SIGN_OUT_SUCCESS:
        return {
          ...state,
          user:null,
          isLoading:false,
          isAuthenticated:false
        }
      case AuthActionTypes.SIGN_OUT_FAILURE:
        return {
          ...state,
          isError:true,
          isLoading:false,
          error:action.payload,
          isAuthenticated:false,
          user:null,
        }
      default:
        return state     
  }

}


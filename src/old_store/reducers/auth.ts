import { AuthActionTypes, AuthState, AuthAction } from "../types"
 
const initialState: AuthState = {
  user:null,
  isAuthenticated:false,
  isLoading:true,
  isError:false,
  error:null
}


export const authReducer = (state = initialState, action : AuthAction) :AuthState => {

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
      default:
        return state     
  }

}


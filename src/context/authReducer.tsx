import { User } from "../interfaces/interfaces.auth"


export interface AuthState {
    user: User | null,
    // token: string | null,
    status: 'checking' | 'loggedIn' | 'loggedOut',
    errorMessage: string,
}

type ActionType = 
| {type: 'LOGIN', payload: User}
| {type: 'ADD_ERROR', payload: string}
| {type: 'REMOVE_ERROR'}
| {type: 'NOT_AUTH'}
| {type: 'LOGOUT'}

// | {type: 'START_CHECKING'}
// | {type: 'END_CHECKING'}

export const authReducer = (state: AuthState, action: ActionType): AuthState => {
    switch (action.type) {

        case 'ADD_ERROR':
            return {
                ...state,
                user: null,
                status: 'loggedOut',
                errorMessage: action.payload,
            }

        case 'REMOVE_ERROR':
            return {
                ...state,
                user: null,
                status: 'loggedOut',
                errorMessage: '',
            }

        case 'LOGIN':
            return {
                ...state, 
                errorMessage: '',
                status: 'loggedIn',
                user: action.payload
            }
        case 'LOGOUT':
        case 'NOT_AUTH':
            return {
                ...state, 
                status: 'loggedOut',
                user: null
            }

        // case 'END_CHECKING':
        //     return {
        //         ...state, 
        //     }

        default:
            return state
    }
}

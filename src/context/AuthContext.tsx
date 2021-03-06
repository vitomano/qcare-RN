import React, { useEffect, useReducer } from 'react'
import { createContext } from "react";
import qcareApi from '../api/qcareApi';
import { LoginResponse, User, LoginData, RegisterData } from '../interfaces/interfaces.auth';
import { authReducer, AuthState } from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useEmail } from '../helpers/useEmail';

type AuthContextProps = {
    // token: string | null,
    user: User | null,
    status: 'checking' | 'loggedIn' | 'loggedOut',
    errorMessage: string,
    login: (loginData:LoginData) => void,
    register: (registerData:RegisterData) => void,
    logout: () => void,
    removeError: () => void,
}

const INITITAL_STATE: AuthState = {
    status: 'checking',
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, INITITAL_STATE)

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        
        //No hay token
        if (!token) return dispatch({ type: 'NOT_AUTH' })
        
        //Hay token
        console.log('vamos',token)
        const resp = await qcareApi.get('/auth/me')
        if (resp.status !== 200) return dispatch({ type: 'NOT_AUTH' })
        dispatch({ type: 'LOGIN', payload: resp.data.user })
        await AsyncStorage.setItem('token', resp.data.token)

    }


    const login = async ({ email, password }: LoginData) => {

        try {
            const { data } = await qcareApi.post<LoginResponse>("/auth/login", { email, password })
            dispatch({ type: 'LOGIN', payload: data.user })

            await AsyncStorage.setItem('token', data.token)

        } catch (error: any) {
            dispatch({
                type: 'ADD_ERROR',
                payload: error.response.data.msg || 'Información Incorrecta'
            })
        }
    }

    const removeError = () => {
        dispatch({ type: 'REMOVE_ERROR' })
    }

    const logout = async() => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'LOGOUT' })
    }

    const register = async ({ name, company, email, password }: RegisterData) => {

        const {msg, ok} = useEmail(email)
        console.log('vamos a ver',email)
        console.log('ok?',ok)

        if(name.length === 0) return Alert.alert('Name is required')
        if(!ok) return Alert.alert(msg)
        if(password.length < 6) return Alert.alert('Password must be at least 6 characters')

        try {
            const { data } = await qcareApi.post<LoginResponse>('/auth/register', {
                name,
                email, 
                password,
                company,
                rol:"USER_ROLE"
            })
            dispatch({ type: 'LOGIN', payload: data.user })

            await AsyncStorage.setItem('token', data.token)

        } catch (error: any) {
            dispatch({
                type: 'ADD_ERROR',
                payload: error.response.data.msg || 'User already registered'
            })

        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            register,
            login,
            logout,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}
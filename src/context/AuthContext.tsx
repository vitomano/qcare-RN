import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from "react";
import qcareApi from '../api/qcareApi';
import { LoginResponse, User, LoginData, RegisterData } from '../interfaces/interfaces.auth';
import { authReducer, AuthState } from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useEmail } from '../hooks/useEmail';


type AuthContextProps = {
    user: User | null,
    status: 'checking' | 'loggedIn' | 'loggedOut',
    errorMessage: string,
    loading: boolean,
    login: (loginData: LoginData) => void,
    register: (registerData: RegisterData) => void,
    logout: () => void,
    removeError: () => void,
    refresh: () => void,
}

const INITITAL_STATE: AuthState = {
    status: 'checking',
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, INITITAL_STATE)
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        checkToken()
    }, [reload])

    const refresh = () => {
        setReload(!reload)
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');

        //No hay token
        if (!token) return dispatch({ type: 'NOT_AUTH' })

        try {
            // Hay token
            const { data } = await qcareApi.get<LoginResponse>('/auth/me')
            // if(resp.status !== 200) {
            //     return dispatch({ type: 'LOGOUT' })
            // }
            
            await AsyncStorage.setItem('token', data?.token!);

            dispatch({
                type: 'LOGIN', payload: {
                    uid: data?.uid!,
                    name: data?.name!,
                    lastname: data?.lastname!,
                    profile: data?.profile!,
                    company: data?.company!,
                    contacts: data?.contacts!,
                    rol: data?.rol!
                }
            })

        } catch (error) {
            console.log(error)
            return dispatch({ type: 'NOT_AUTH' })
        } finally { setLoading(false) }

    }


    const login = async ({ email, password }: LoginData) => {

        try {
            const { data } = await qcareApi.post<LoginResponse>("/auth/login", { email, password })

            dispatch({
                type: 'LOGIN', payload: {
                    uid: data.uid,
                    name: data.name,
                    lastname: data.lastname,
                    profile: data.profile,
                    company: data.company,
                    contacts: data.contacts,
                    rol: data.rol
                }
            })

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

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'LOGOUT' })
    }

    const register = async ({ name, company, email, password, lastname }: RegisterData) => {

        const { msg, ok } = useEmail(email)

        if (name.length === 0) return Alert.alert('Name is required')
        if (!ok) return Alert.alert(msg)
        if (password.length < 6) return Alert.alert('Password must be at least 6 characters')

        try {
            const { data } = await qcareApi.post<LoginResponse>('/auth/register', {
                name,
                lastname,
                email,
                password,
                company,
                rol: "USER_ROLE"
            })
            dispatch({
                type: 'LOGIN', payload: {
                    uid: data.uid,
                    name: data.name,
                    lastname: data.lastname,
                    profile: data.profile,
                    company: data.company,
                    contacts: data.contacts
                }
            })

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
            loading,
            register,
            login,
            logout,
            removeError,
            refresh
        }}>
            {children}
        </AuthContext.Provider>
    )
}
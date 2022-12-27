import React, { useEffect, useReducer } from 'react'
import { createContext } from "react";
import qcareApi from '../api/qcareApi';
import { LoginResponse, User, LoginData, RegisterData } from '../interfaces/interfaces.auth';
import { authReducer, AuthState } from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useEmail } from '../hooks/useEmail';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type AuthContextProps = {
    user: User | null,
    status: 'checking' | 'loggedIn' | 'loggedOut',
    errorMessage: string,
    login: (loginData: LoginData) => void,
    register: (registerData: RegisterData) => void,
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
        authToken()
    }, [])

    const authToken = async () => {

        const token = await AsyncStorage.getItem('token');

        //No hay token
        if (!token) return dispatch({ type: 'NOT_AUTH' })
        const queryClient = useQueryClient()

        useQuery(
            ['auth'],
            async () => {
                const { data } = await qcareApi.get<LoginResponse>('/auth/me')
                return data
            },
            {
                onSuccess: async (data) => {
                    await AsyncStorage.setItem('token', data.token);

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
                },
                onError: () => {
                    dispatch({ type: 'NOT_AUTH' })

                    queryClient.invalidateQueries(['auth'])
                }
            }
        );
    }


    const login = async ({ email, password }: LoginData) => {
        const queryClient = useQueryClient()

        useMutation(async () => {
            const { data } = await qcareApi.post<LoginResponse>("/auth/login", { email, password })
            return data
        }, {

            onSuccess: async (data) => {
                await AsyncStorage.setItem('token', data.token);

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

                queryClient.invalidateQueries(['auth'])
            },
            onError: () => {
                queryClient.invalidateQueries(['auth'])
                dispatch({
                    type: 'ADD_ERROR',
                    payload: 'Información Incorrecta'
                })

            }
        });


    }

    const removeError = () => {
        dispatch({ type: 'REMOVE_ERROR' })
    }

    const logout = async () => {
        const queryClient = useQueryClient()

        useMutation(async () => await AsyncStorage.removeItem('token') ,
            {
                onSettled: async () => {
                    dispatch({ type: 'LOGOUT' })
                    queryClient.removeQueries(['auth'])
                }
            });




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
            register,
            login,
            logout,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )
}
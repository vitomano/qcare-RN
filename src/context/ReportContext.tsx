import React, { useState } from 'react';
import { createContext, useReducer } from 'react'
import qcareApi from '../api/qcareApi';
import { PreReport } from '../helpers/preReport';
import { totalKilos, totalSamples, formatSplit } from '../helpers/formatSplit';
import { fruitType } from '../helpers/fruitType';
import { AllReportsResponse, IntakesResponse, SingleReport } from '../interfaces/intakes.reports';
import { reportReducer, ReportState } from './reportReducer';


const INITIAL_STATE = {
    mainData: null,
    pallets: [],
    fruit: 'other',
    reload: true
}

interface ReportContextProps {
    allReports: SingleReport[],
    getAllReports: () => void,
    intakes: ReportState,
    getMainData: (id: string) => void,
    // setPallets: (obj: PreReport[]) => void,
    // addNewPallets: (obj: PreReport) => void,
    // updateValue: (id: string, item: keyof PreReport, value: string | null) => void,
    // resetAll: () => void
    // reload: () => void
}


export const ReportContext = createContext({} as ReportContextProps)

export const ReportProvider = ({ children }: any) => {

    const [intakes, dispatch] = useReducer(reportReducer, INITIAL_STATE)
    const [allReports, setAllReports] = useState<SingleReport[]>([])

    const getAllReports = async () => {
        try {
            const { data } = await qcareApi.get<AllReportsResponse>(`/report?page=1`)
            setAllReports(data.reports)
        } catch (error) {
            console.log(error)
        }
    };

    const getMainData = async (id: string) => {
        
        // const { data } = await qcareApi.get<IntakesResponse>(`/report/new-report/${id}`)
        // const intake = data.intakes.data
        // const fruit = data.intakes.fruit

        // dispatch({
        //     type: 'ADD_MAINDATA',
        //     payload: { intake, fruit }
        // })
    }

    // const setPallets = (obj: PreReport[]) => {
    //     dispatch({ type: 'REMOVE_PALLETS' })
    //     dispatch({ type: 'SET_PALLETS', payload: obj })
    // }

    // const addNewPallets = (obj: PreReport) => {
    //     dispatch({ type: 'ADD_NEWPALLET', payload: obj })
    // }

    // const updateValue = (id: string, item: keyof PreReport, value: string | null) => {
    //     dispatch({ type: 'CHANGE_VALUE', payload: { id, item, value } })
    // }

    // const resetAll = () => dispatch({ type: 'REMOVE_PALLETS' })
    // const reload = () => dispatch({ type: 'RELOAD' })

    return (
        <ReportContext.Provider value={{
            allReports,
            getAllReports,
            intakes,
            getMainData,
            // setPallets,
            // updateValue,
            // resetAll,
            // addNewPallets,
            // reload
        }}>
            {children}
        </ReportContext.Provider>
    )
};
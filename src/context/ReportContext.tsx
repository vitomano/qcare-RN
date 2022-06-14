import * as React from 'react';
import { createContext, useReducer } from 'react'
import qcareApi from '../api/qcareApi';
import { PreReport } from '../data/preReport';
import { totalKilos, totalSamples, formatSplit } from '../helpers/formatSplit';
import { fruitType } from '../helpers/fruitType';
import { IntakeResponse } from '../interfaces/intakes.reports';
import { reportReducer, ReportState } from './reportReducer';


const INITIAL_STATE = {
    mainData: null,
    pallets: [],
    fruit: 'other',
    reload: true
}

interface ReportContextProps {
    intakes: ReportState,
    getMainData: (id: string) => void,
    setPallets: (obj: PreReport[]) => void,
    addNewPallets: (obj: PreReport) => void,
    updateValue: (id: string, item: keyof PreReport, value: string | null) => void,
    resetAll: () => void
    reload: () => void
}


export const ReportContext = createContext({} as ReportContextProps)

export const ReportProvider = ({ children }:any) => {

    const [intakes, dispatch] = useReducer(reportReducer, INITIAL_STATE)

    const getMainData = async(id:string) => {
        const { data } = await qcareApi.get<IntakeResponse>(`/report/new-report/${id}`)
        const intake = data.intakeReport.data
        const fruit = data.intakeReport.fruit

        dispatch({
            type: 'ADD_MAINDATA',
            payload: {intake,fruit}
        })
    }

    const setPallets = ( obj: PreReport[]) => {
        dispatch({type: 'REMOVE_PALLETS'})
        dispatch({type:'SET_PALLETS', payload: obj})
    }

    const addNewPallets = ( obj: PreReport) => {
        dispatch({type:'ADD_NEWPALLET', payload: obj})
    }

    const updateValue = (id:string, item: keyof PreReport, value: string | null) => {
        dispatch({type: 'CHANGE_VALUE', payload:{id, item, value}})
    }

    const resetAll = () => dispatch({type: 'REMOVE_PALLETS'})
    const reload = () => dispatch({type: 'RELOAD'})
    

    return (
        <ReportContext.Provider value={{
            intakes, 
            getMainData,
            setPallets,
            updateValue,
            resetAll,
            addNewPallets,
            reload
        }}>
            {children}
        </ReportContext.Provider>
    )
};
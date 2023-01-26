import React, { createContext, useState } from 'react'
import { dateFormat } from '../helpers/dateFormat';
import { QueryType } from '../interfaces/interfaces';

interface Props { children: JSX.Element | JSX.Element[] }

interface FilterContextProps {
    palletRef: string
    grower: string
    status: string

    startDate: string | null
    endDate: string | null

    handleString: (query: QueryType, value: string) => void
    handleDate: (query: QueryType, date: Date) => void
    handleStatus: (status:string) => void
    cleanDates: () => void
    cleanAll: () => void
}

export const FilterLifeContext = createContext({} as FilterContextProps)

export const FilterLifeProvider = ({ children }: Props) => {

    const [palletRef, setPalletRef] = useState<string>("")
    const [grower, setGrower] = useState<string>("")
    const [status, setStatus] = useState<string>("")

    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)

    //Filter --------------------------------------------------------------------------------------

    const handleString = (query: QueryType, value: string) => {
        if (query === "palletRef") setPalletRef(value)
        if (query === "grower") setGrower(value)
    };

    const handleDate = (query: QueryType, date: Date) => {
        if (query === "startDate") setStartDate(dateFormat(date))
        if (query === "endDate") setEndDate(dateFormat(date))
    }

    const handleStatus = (currentStatus: string) => {
        currentStatus === status
            ? setStatus("")
            : setStatus(currentStatus)
    };

    const cleanDates = () => {
        setStartDate(null)
        setEndDate(null)
    };

    const cleanAll = () => {
        setPalletRef("")
        setGrower("")
        setStatus("")
        setStartDate(null)
        setEndDate(null)
    };


    return (
        <FilterLifeContext.Provider value={{
            palletRef,
            grower,
            status,

            startDate,
            endDate,

            handleString,
            handleDate,
            handleStatus,
            cleanDates,

            cleanAll,
        }}>
            {children}
        </FilterLifeContext.Provider>
    )
};
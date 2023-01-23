import React, { createContext, useState } from 'react'
import { dateFormat } from '../helpers/dateFormat';
import { QueryType } from '../interfaces/interfaces';

interface Props { children: JSX.Element | JSX.Element[] }

interface FilterContextProps {
    palletRef: string
    deliveryNote: string
    supplier: string
    fruit: string[]
    score: string[]
    startDate: string | null
    endDate: string | null

    handleString: (query: QueryType, value: string) => void
    handleArray: (query: QueryType, value: string) => void
    handleDate: (query: QueryType, date: Date) => void
    cleanDates: () => void
    cleanAll: () => void
}

export const FilterContext = createContext({} as FilterContextProps)

export const FilterProvider = ({ children }: Props) => {

    const [palletRef, setPalletRef] = useState<string>("")
    const [deliveryNote, setDeliveryNote] = useState<string>("")
    const [supplier, setSupplier] = useState<string>("")
    const [fruit, setFruit] = useState<string[]>([])
    const [score, setScore] = useState<string[]>([])
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)

    //Filter --------------------------------------------------------------------------------------

    const handleString = (query: QueryType, value: string) => {
        if (query === "palletRef") setPalletRef(value)
        if (query === "deliveryNote") setDeliveryNote(value)
        if (query === "supplier") setSupplier(value)
    };

    const handleArray = (query: QueryType, val: string) => {

        if (query === "fruit") {
            if (fruit.includes(val)) setFruit(fruit.filter(item => item !== val))
            else setFruit([...fruit, val])
        }

        if (query === "score") {
            if (score.includes(val)) setScore(score.filter(item => item !== val))
            else setScore([...score, val])
        }
    };

    const handleDate = (query: QueryType, date: Date) => {
        if (query === "startDate") setStartDate(dateFormat(date))
        if (query === "endDate") setEndDate(dateFormat(date))
    }
    const cleanDates = () => {
        setStartDate(null)
        setEndDate(null)
    };

    const cleanAll = () => {
        setPalletRef("")
        setDeliveryNote("")
        setSupplier("")
        setFruit([])
        setScore([])
        setStartDate(null)
        setEndDate(null)
    };


    return (
        <FilterContext.Provider value={{
            palletRef,
            deliveryNote,
            supplier,
            fruit,
            score,
            startDate,
            endDate,

            handleString,
            handleArray,
            handleDate,
            cleanDates,

            cleanAll,
        }}>
            {children}
        </FilterContext.Provider>
    )
};
import { useState, useEffect } from 'react';
import qcareApi from '../api/qcareApi';
import { MainInfo, Pallet, SingleReportResponse } from '../interfaces/intakes.reports';

export const useReport = ( id: string ) => {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ mainData, setMainData ] = useState<MainInfo>({} as MainInfo)
    const [ pallets, setPallets ] = useState<Pallet[]>([])
    const [ score, setScore ] = useState<string>("0")
    const [ date, setDate ] = useState<string|undefined>(undefined)

    const loadPokemon = async() => {
        const resp = await qcareApi.get<SingleReportResponse>(`/report/${id}`);
        setMainData( resp.data.singleReport.mainData );
        setPallets( resp.data.singleReport.pallets );
        setScore( (resp.data.singleReport.score).toString() );
        setDate( resp.data.singleReport.date );
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemon();
    }, [])

    return {
        isLoading,
        mainData,
        pallets,
        score,
        date
    }
}

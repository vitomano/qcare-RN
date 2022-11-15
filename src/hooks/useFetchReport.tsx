import { useState, useEffect } from 'react';
import qcareApi from '../api/qcareApi';
import { MainInfo, Pallet, SingleReportResponse } from '../interfaces/intakes.reports';

export const useFetchReport = ( id: string ) => {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ mainData, setMainData ] = useState<MainInfo>({} as MainInfo)
    const [ pallets, setPallets ] = useState<Pallet[]>([])
    const [ score, setScore ] = useState<string>("0")
    const [ comments, setComments ] = useState<string>("")
    const [ date, setDate ] = useState<string|undefined>(undefined)

    const loadReport = async() => {
        const resp = await qcareApi.get<SingleReportResponse>(`/report/${id}`);
        setMainData( resp.data.singleReport.mainData );
        setPallets( resp.data.singleReport.pallets );
        setScore( (resp.data.singleReport.score).toString() );
        setDate( resp.data.singleReport.date );
        setComments( resp.data.singleReport.comments );
        setIsLoading(false);
    }

    useEffect(() => {
        loadReport();
    }, [])

    return {
        isLoading,
        mainData,
        pallets,
        score,
        date,
        comments
    }
}

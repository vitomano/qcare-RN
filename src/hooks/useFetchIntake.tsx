import { useState, useEffect } from 'react';
import qcareApi from '../api/qcareApi';
import { totalSamples } from '../helpers/formatSplit';
import { fruitType } from '../helpers/fruitType';
import { BatchInfo, MainInfo, Pallet, SingleIntake, SingleReportResponse } from '../interfaces/intakes.reports';
import { Fruit } from '../interfaces/interfaces';

export const useFetchIntake = (id: string) => {

    const [isLoading, setIsLoading] = useState(true)
    const [mainData, setMaindata] = useState<BatchInfo | null>(null)
    const [totalPallets, setTotalPallets] = useState(0)
    const [fruit, setFruit] = useState<Fruit>("other")

    useEffect(() => {
        loadIntake();
    }, [])

    const loadIntake = async () => {

        try {
            const { data } = await qcareApi.get<SingleIntake>(`/prereport/new-report/${id}`)

            setFruit(fruitType(data.intakeReport.data?.product) || "other")
            setTotalPallets(parseInt(data.intakeReport.data?.total_pallets) || 0)
            setMaindata(data.intakeReport.data || {})

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        mainData,
        totalPallets,
        fruit,
    }
}

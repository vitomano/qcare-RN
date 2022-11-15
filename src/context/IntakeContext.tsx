import React, { createContext, useState } from 'react'
import qcareApi from '../api/qcareApi';
import { palletData } from '../data/pallet';
import { palletPrereport } from '../data/prereport';
import { formatSplit, totalKilos, totalSamples } from '../helpers/formatSplit';
import { fruitType } from '../helpers/fruitType';
// import { IntakeSingleResponse, PalletState } from '../interfaces/intakes.interface';
import { DataPrereport, IntakeSingleResponse, MainInfo, PalletState, SingleIntake } from '../interfaces/intakes.reports';
import { DetailName, Fruit } from '../interfaces/interfaces';

interface Props { children: JSX.Element | JSX.Element[] }

interface IntakeContextProps {
    isLoading: boolean,
    mainData: MainInfo | null,
    fruit: Fruit,
    pallets: PalletState[] | DataPrereport[],
    totalPallets: number,
    getMainData: (id: string) => void;
    handleMain: (val:string, item: keyof MainInfo) => void;
    setDataPrereport: (totalPallet: number) => void;
    setNewPallets: (fruit: Fruit, samples: number, totalPallets: number) => void;
    handleFruit: (fruit: string) => void;
    handleChecked: (pid: string, detailName: DetailName, name: string) => void;
    handleSwitch: (pid: string, detailName: DetailName, name: string) => void;
    handleInputText: (pid: string, detailName: DetailName, name: string, valor: string | number) => void;
    handleInputArray: (pid: string, detailName: DetailName, name: string, index: number, valor: string | number) => void;
    addNewPallet: () => void;
    removePallet: (pid: string) => void;

}

export const IntakeContext = createContext({} as IntakeContextProps)

export const IntakeProvider = ({ children }: Props) => {

    const [pallets, setPallets] = useState<PalletState[] | DataPrereport[]>([])
    const [mainData, setMainData] = useState<MainInfo | null>(null)
    const [fruit, setFruit] = useState<Fruit>('other')
    const [totalPallets, setTotalPallets] = useState(0)
    const [allSamples, setAllSamples] = useState(1)
    const [isLoading, setIsLoading] = useState(true)


    //Prereport --------------------------------------------------------------------------------------

    const getMainData = async (id: string) => {

        setIsLoading(true)

        try {
            setMainData(null)
            const { data } = await qcareApi.get<SingleIntake>(`/prereport/new-report/${id}`)

            // setMainData(data.intakeReport.data)

            setMainData({
                ...data.intakeReport.data,
                kilos: totalKilos(data.intakeReport.data.format, data.intakeReport.data.total_boxes).toString() || "0",
                samples: totalSamples(data.intakeReport.data.format).toString() || "1",
                format_gr: formatSplit(data.intakeReport.data.format).toString() || "0",
              })


            setTotalPallets(Number(data.intakeReport.data.total_pallets) | 0)
            setFruit(fruitType(data.intakeReport.data.product) || "other")
            setAllSamples(Number(data.intakeReport.data.samples || 1))

        } catch (error) {
            console.log(error)
        } finally {setIsLoading(false)}

    };

    const handleMain = (val:string, item: keyof MainInfo) => {
        setMainData({
            ...mainData as MainInfo,
            [item] : val})
    }

    const setDataPrereport = (totalPallets: number = 0) => {
        setPallets([])

        for (let i = 0; i < (totalPallets || 0); i++) {
            setPallets(c => [...c as DataPrereport[], palletPrereport()])
        }
    };



    //Prereport (END) --------------------------------------------------------------------------------

        //GET SINGLE INTAKE (To report)
        const getMainDataReport = async (id: string) => {

            setIsLoading(true)
    
            try {
                setMainData(null)
                const { data } = await qcareApi.get<IntakeSingleResponse>(`/report/new-report/${id}`)
    
                setMainData(data.intakeReport.data)
                setTotalPallets(Number(data.intakeReport.data.total_pallets) | 0)
                setFruit(fruitType(data.intakeReport.data.product))
                setAllSamples(Number(data.intakeReport.data.samples || 1))
    
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
    
            }
    
        };

    const setNewPallets = (fruit: Fruit, samples: number = 1, totalPallets: number = 0) => {
        setPallets([])

        for (let i = 0; i < (totalPallets || 0); i++) {
            setPallets(c => [...c as PalletState[], palletData((fruit || 'other'), (samples || 1))])
        }
    };

    // ADD NEW PALLET
    const addNewPallet = () => {
        setPallets(c => [...c as PalletState[], palletData(fruit, allSamples)])
    };

    // REMOVE PALLET
    const removePallet = (pid: string) => {
        // const newPallets = pallets.filter(pall => pall.id !== pid)
        // if(newPallets) setPallets(newPallets)
    };


    // CHANGE FRUIT
    const handleFruit = (val: string) => {
        setFruit(val as Fruit)
    };


    // CHECK / UNCHECK ITEM
    const handleChecked = (pid: string, detailName: DetailName, name: string) => {
        const newPallet = pallets.map(newItem => {
            if (newItem.id === pid) {
                return {
                    ...newItem,
                    [detailName]: newItem[detailName].map(item => {
                        if (item.name === name)
                            return { ...item, check: !item.check }
                        return item
                    })
                }
            }
            else return newItem

        })
        setPallets(newPallet as PalletState[])
    };

    const handleSwitch = (pid: string, detailName: DetailName, name: string) => {

        const newPallet = pallets.map(newItem => {
            if (newItem.id === pid) {
                return {
                    ...newItem,
                    [detailName]: newItem[detailName].map(item => {
                        if (item.name === name)
                            return { ...item, valor: !item.valor }
                        return item
                    })
                }
            }
            else return newItem

        })
        setPallets(newPallet as PalletState[])
    };

    const handleInputText = (pid: string, detailName: DetailName, name: string, valor: string | number) => {

        const newPallet = pallets.map(newItem => {
            if (newItem.id === pid) {
                return {
                    ...newItem,
                    [detailName]: newItem[detailName].map(item => {
                        if (item.name === name)
                            return { ...item, valor }
                        return item
                    })
                }
            }
            else return newItem

        })
        setPallets(newPallet as PalletState[])
    };

    const handleInputArray = (pid: string, detailName: DetailName, name: string, index: number, value: string | number) => {

        const newPallet = pallets.map(newItem => {
            if (newItem.id === pid) {
                return {
                    ...newItem,
                    [detailName]: newItem[detailName].map(item => {

                        if (item.name === name && Array.isArray(item.valor)) {
                            let newVal = []
                            for (let i = 0; i < item.valor.length; i++) {
                                if (i === index) { newVal.push(value) }
                                else newVal.push(item.valor[i])
                            }

                            return { ...item, valor: newVal }
                        } else {
                            return item
                        }
                    })
                }
            }
            else return newItem

        })
        setPallets(newPallet as PalletState[])
    };


    return (
        <IntakeContext.Provider value={{
            isLoading,
            mainData,
            fruit,
            pallets,
            totalPallets,
            getMainData,
            handleMain,
            setDataPrereport,
            setNewPallets,
            handleFruit,

            handleChecked,
            handleSwitch,
            handleInputText,
            handleInputArray,
            addNewPallet,
            removePallet
        }}>
            {children}
        </IntakeContext.Provider>
    )
};
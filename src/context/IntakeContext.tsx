import { createContext, useState } from 'react'
import qcareApi from '../api/qcareApi';
import { palletData } from '../data/pallet';
import { fruitType } from '../helpers/fruitType';
// import { IntakeSingleResponse, PalletState } from '../interfaces/intakes.interface';
import { IntakeSingleResponse, MainInfo, PalletState } from '../interfaces/intakes.reports';
import { DetailName, Fruit } from '../interfaces/interfaces';

interface Props { children: JSX.Element | JSX.Element[] }

interface IntakeContextProps {
    mainData: MainInfo | null,
    fruit: Fruit
    pallets: PalletState[],
    getMainData: (id: string) => void;
    setNewPallets: (fruit: Fruit, samples: number, totalPallets: number) => void;
    handleFruit: (fruit: Fruit) => void;
    handleChecked: (pid: string, detailName: DetailName, name: string) => void;
    handleSwitch: (pid: string, detailName: DetailName, name: string) => void;
    handleInputText: (pid: string, detailName: DetailName, name: string, valor: string | number) => void;
    handleInputArray: (pid: string, detailName: DetailName, name: string, index: number, valor: string | number) => void;
    addNewPallet: () => void;
    removePallet: (pid: string) => void;

}

export const IntakeContext = createContext({} as IntakeContextProps)

export const IntakeProvider = ({ children }: Props) => {

    const [pallets, setPallets] = useState<PalletState[]>([])
    const [mainData, setMainData] = useState<MainInfo | null>(null)
    const [fruit, setFruit] = useState<Fruit>('other')
    const [allSamples, setAllSamples] = useState(1)


    //GET SINGLE INTAKE (To report)
    const getMainData = async (id: string) => {
        setMainData(null)
        const { data } = await qcareApi.get<IntakeSingleResponse>(`/report/new-report/${id}`)
        setMainData(data.intakeReport.data)
        setFruit(fruitType(data.intakeReport.data.product))
        setAllSamples(Number(data.intakeReport.data.samples || 1))
    };

    const setNewPallets = (fruit: Fruit, samples: number = 1, totalPallets: number = 0) => {
        setPallets([])

        for (let i = 0; i < (totalPallets || 0); i++) {
            setPallets(c => [...c, palletData((fruit || 'other'), (samples || 1))])
        }
    };

    // ADD NEW PALLET
    const addNewPallet = () => {
        setPallets(c => [...c, palletData(fruit, allSamples)])
    };

    // REMOVE PALLET
    const removePallet = (pid: string) => {
        const newPallets = pallets.filter(pall => pall.id !== pid)
        setPallets(newPallets)
    };


    // CHANGE FRUIT
    const handleFruit = (fruit: Fruit) => {
        setFruit(fruit)
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
        setPallets(newPallet)
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
        setPallets(newPallet)
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
        setPallets(newPallet)
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
        setPallets(newPallet)
    };


    return (
        <IntakeContext.Provider value={{
            mainData,
            fruit,
            pallets,
            getMainData,
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
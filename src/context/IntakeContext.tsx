import React, { createContext, useState } from 'react'
import { Platform } from 'react-native';
import { Asset } from 'react-native-image-picker';
import qcareApi from '../api/qcareApi';
import { newMainData } from '../data/mainData';
import { palletNewData } from '../data/newreport';
import { palletData } from '../data/pallet';
import { palletPrereport } from '../data/prereport';
import { alertMsg } from '../helpers/alertMsg';
import { formatSplit, totalKilos, totalSamples } from '../helpers/formatSplit';
import { fruitType } from '../helpers/fruitType';
import { imagesLength } from '../helpers/imagesLength';
import { DataPrereport, DetailObject, IntakeSingleResponse, MainInfo, NewGrower, PalletState, SingleIntake } from '../interfaces/intakes.reports';
import { DetailName, Fruit, Status } from '../interfaces/interfaces';

interface Props { children: JSX.Element | JSX.Element[] }


interface IntakeContextProps {
    isLoading: boolean,
    mainData: MainInfo | null,
    fruit: Fruit,
    pallets: DataPrereport[] | PalletState[],
    totalPallets: number,
    samples: number,
    getMainData: (id: string) => void;
    getMainDataReport: (id: string) => void;
    getMainDataNew: (fruit: Fruit) => void;
    handleMain: (val: string, item: keyof MainInfo) => void;
    // setDataPrereport: (totalPallet: number) => void;
    setNewPallets: () => void;
    addPallet: (grower: boolean) => void;
    handleFruit: (fruit: string) => void;
    handleChecked: (pid: string, detailName: DetailName, name: string) => void;
    handleSwitch: (pid: string, detailName: DetailName, name: string) => void;
    handleInputText: (pid: string, detailName: DetailName, name: string, valor: string | number) => void;
    handleInputArray: (pid: string, detailName: DetailName, name: string, index: number, valor: string) => void;
    handleStatus: (pid: string, statusName: Status, value: string) => void;
    handleGrower: (pid: string, item: keyof NewGrower, value: string | number) => void;
    addFiles: (pid: string, files: Asset[]) => void;
    addGrower: () => void;
    addItem: (pid: string, detailName: DetailName, item: DetailObject) => void;
    backGrower: () => void;
    removePallet: (pid: string) => void;
    addRemoveSample: ( action: "add" | "remove", pid: string) => void;
    cleanAll: () => void
}

export const IntakeContext = createContext({} as IntakeContextProps)

export const IntakeProvider = ({ children }: Props) => {

    const [pallets, setPallets] = useState<DataPrereport[]>([])
    const [mainData, setMainData] = useState<MainInfo | null>(null)
    const [fruit, setFruit] = useState<Fruit>('other')
    const [totalPallets, setTotalPallets] = useState(0)
    const [allSamples, setAllSamples] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    //Prereport --------------------------------------------------------------------------------------

    const getMainDataNew = async (fruit: Fruit) => {

        setIsLoading(true)

        try {
            setMainData(null)

            setMainData(newMainData)

            setTotalPallets(Number(newMainData.total_pallets) | 0)
            setFruit(fruitType(fruit) || "other")
            setAllSamples(Number(newMainData.samples) || 1)

            for (let i = 0; i < (Number(newMainData.total_pallets) || 0); i++) {

                setPallets(c => [...c as unknown as PalletState[], {
                    ...palletNewData(fruit, Number(newMainData.samples)) as any}])

            }

        } catch (error) {
            console.log(error)
        } finally { setIsLoading(false) }

    };

    const getMainData = async (id: string) => {

        setIsLoading(true)

        try {
            setMainData(null)
            const { data } = await qcareApi.get<SingleIntake>(`/prereport/new-report/${id}`)

            setMainData({
                ...data.intakeReport.data,
                kilos: totalKilos(data.intakeReport.data.format, data.intakeReport.data.total_boxes).toString() || "0",
                samples: totalSamples(data.intakeReport.data.format).toString() || "1",
                format_gr: formatSplit(data.intakeReport.data.format).toString() || "0",
            })


            setTotalPallets(Number(data.intakeReport.data.total_pallets) | 0)
            setFruit(fruitType(data.intakeReport.data.product) || "other")
            setAllSamples(Number(data.intakeReport.data.samples) || 1)

            for (let i = 0; i < (Number(data.intakeReport.data.total_pallets) || 0); i++) {
                setPallets(c => [...c as DataPrereport[], palletPrereport()])
            }

        } catch (error) {
            console.log(error)
        } finally { setIsLoading(false) }

    };

    const handleMain = (val: string, item: keyof MainInfo) => {
        setMainData({
            ...mainData as MainInfo,
            [item]: val
        })
    }

    //Prereport (END) --------------------------------------------------------------------------------

    //GET SINGLE DATA TO FINISH PRE REPORT (To report)
    const getMainDataReport = async (id: string) => {

        setIsLoading(true)

        try {
            setMainData(null)
            const { data } = await qcareApi.get<IntakeSingleResponse>(`/report/new-report/${id}`)

            setMainData(data.intakeReport.mainData)
            setTotalPallets(Number(data.intakeReport.mainData?.total_pallets) | 0)
            setFruit(data.intakeReport.fruit || "other")
            setAllSamples(Number(data.intakeReport.mainData?.samples || 1))

            for (let i = 0; i < (Number(data.intakeReport.pallets.length) || 0); i++) {
                setPallets(c => [...c as unknown as PalletState[], {
                    ...palletData(data.intakeReport.fruit, Number(data.intakeReport.mainData?.samples || 1)) as any,
                    prereport: data.intakeReport.pallets[i] || null,
                    addGrower: data.intakeReport.pallets[i].addGrower || null
                }])
            }
        } catch (error) {
            console.log(error)
        } finally { setIsLoading(false) }
    };


    // ADD ADDITIONAL PALLET
    const setNewPallets = () => {
        const growerExist = pallets.every(pall => pall.newGrower === null)

        setPallets(c => [...c as DataPrereport[], {
            ...palletPrereport(),
            newGrower: growerExist
                ? null
                : { grower_variety: "", boxes: "" }
        }])
    };

    const addPallet = (grower = false) => {

        setPallets(c => [...c as DataPrereport[], {
            ...palletPrereport(),
            newGrower: grower
                ? { grower_variety: "", boxes: "" }
                : null
        }])
    };

    // REMOVE PALLET
    const removePallet = (pid: string) => {
        const newPallets = pallets.filter(pall => pall.id !== pid)
        if (newPallets) setPallets(newPallets)
        else setPallets(pallets)
    };


    // CHANGE FRUIT
    const handleFruit = (val: string) => {
        setFruit(val as Fruit)
    };

    // CHANGE STATUS
    const handleStatus = (pid: string, statusName: Status, value: string) => {
        const newPallet = pallets.map(pall => {
            if (pall.id === pid) {
                return { ...pall, [statusName]: value };
            }
            return pall;
        });
        setPallets(newPallet)
    };


    // CHANGE GROWER-BOXES
    const handleGrower = (pid: string, item: keyof NewGrower, value: string | number) => {
        const newPallet: DataPrereport[] = pallets.map(pall => {
            if (pall.id === pid) {
                return {
                    ...pall,
                    newGrower: {
                        ...pall.newGrower!,
                        [item]: value
                    }
                };
            }
            return pall;
        });
        setPallets(newPallet)
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

    const handleInputArray = (pid: string, detailName: DetailName, name: string, index: number, value: string) => {

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

    const addFiles = (pid: string, files: Asset[]) => {

        const newPallet = pallets.map(pall => {
            if (pall.id === pid) {

                if( pall.images.length === 0 && imagesLength(pallets) >= 30 ) return pall

                return {
                    ...pall, images: files.map(file => {
                        return {
                            // uri: file.uri || undefined,
                            uri: Platform.OS === 'ios' ? file?.uri?.replace('file://', '') : file.uri || undefined,
                            type: file.type,
                            name: file.fileName
                        }
                    })
                };
            }
            return pall;
        });
        setPallets(newPallet)
        if(imagesLength(newPallet) >= 30 ) alertMsg("Max. Images","You completed the limit of 30 images per pre report")
    };

    const cleanAll = () => {
        setPallets([])
        setMainData(null)
        setFruit("other")
        setIsLoading(false)
    };

    const addGrower = () => {

        const newPallets: DataPrereport[] = pallets.map(pal => {
            return {
                ...pal,
                newGrower: {
                    grower_variety: "",
                    boxes: "",
                }
            }
        })
        setPallets(newPallets)
    };

    const backGrower = () => {
        const newPallets = pallets.map(pal => {
            return {
                ...pal,
                newGrower: null
            }
        })
        setPallets(newPallets)
    };

    const addItem = (pid: string, detailName: DetailName, item: DetailObject) => {

        const newPallet = pallets.map(newItem => {
            if (newItem.id === pid) {
                return {
                    ...newItem,
                    [detailName]: [
                        ...newItem[detailName],
                        item
                    ]
                }
            }
            else return newItem

        })
        setPallets(newPallet)
    }

    const addRemoveSample = (action:"add" | "remove", pid:string ) => {

        const newPallet = pallets.map(newItem => {
            if (newItem.id === pid) {
                return {
                    ...newItem,
                    pallgrow: newItem.pallgrow.map(item => {
                        if (item.tipe === "arrays" && action === "add") return { ...item, valor: Array.isArray(item.valor) ? [...item.valor, "0"] : item.valor }
                        if (item.tipe === "arrays" && action === "remove") {
                            Array.isArray(item.valor) && item.valor.pop()
                            return { ...item, valor: item.valor }
                        } return item
                    })
                }
            }
            else return newItem

        })
        setPallets(newPallet)
    };


    return (
        <IntakeContext.Provider value={{
            isLoading,
            mainData,
            fruit,
            pallets,
            samples: allSamples,
            totalPallets,
            getMainData,
            getMainDataReport,
            getMainDataNew,
            handleMain,
            // setDataPrereport,
            setNewPallets,
            addPallet,
            handleFruit,

            handleChecked,
            handleSwitch,
            handleInputText,
            handleInputArray,
            handleStatus,
            handleGrower,
            addFiles,
            addGrower,
            addItem,
            backGrower,
            removePallet,
            addRemoveSample,

            cleanAll,
        }}>
            {children}
        </IntakeContext.Provider>
    )
};
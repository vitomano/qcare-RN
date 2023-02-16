import React, { createContext, useState } from 'react'
import { Platform } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { newMainData } from '../data/mainData';
import { palletNewData } from '../data/newreport';
import { alertMsg } from '../helpers/alertMsg';

import { fruitType } from '../helpers/fruitType';
import { imagesLength } from '../helpers/imagesLength';
import { PalletState, DetailObject, MainInfo, NewGrower } from '../interfaces/intakes.reports';
import { DetailName, Fruit, Status } from '../interfaces/interfaces';

interface Props { children: JSX.Element | JSX.Element[] }


interface CreateContextProps {
    isLoading: boolean,
    mainData: MainInfo | null,
    fruit: Fruit,
    pallets: PalletState[],
    totalPallets: number,
    samples: number,
    getMainDataNew: (fruit: Fruit) => void;
    handleMain: (val: string, item: keyof MainInfo) => void;
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

export const CreateContext = createContext({} as CreateContextProps)

export const CreateProvider = ({ children }: Props) => {

    const [pallets, setPallets] = useState<PalletState[]>([])
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

                setPallets(c => [...c as PalletState[], palletNewData(fruit, Number(newMainData.samples)) as PalletState])

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


    // ADD ADDITIONAL PALLET
    const setNewPallets = () => {
        const growerExist = pallets.every(pall => pall.newGrower === null)

        setPallets(c => [...c as PalletState[], {
            ...palletNewData(fruit, Number(newMainData.samples)),
            newGrower: growerExist
                ? null
                : { grower_variety: "", boxes: "" }
        }])
    };

    const addPallet = (grower = false) => {

        setPallets(c => [...c as PalletState[], {
            ...palletNewData(fruit, Number(newMainData.samples)),
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
        const newPallet: PalletState[] = pallets.map(pall => {
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

        const newPallets: PalletState[] = pallets.map(pal => {
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
        <CreateContext.Provider value={{
            isLoading,
            mainData,
            fruit,
            pallets,
            samples: allSamples,
            totalPallets,
            getMainDataNew,
            handleMain,
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
        </CreateContext.Provider>
    )
};
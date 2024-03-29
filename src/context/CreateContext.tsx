import React, { createContext, useState } from 'react'
import { newMainData } from '../data/mainData';
import { palletNewData } from '../data/newreport';
import { alertMsg } from '../helpers/alertMsg';

import { fruitType } from '../helpers/fruitType';
import { imagesLength } from '../helpers/imagesLength';
import { PalletState, DetailObject, MainData, NewGrower, ImageTemp } from '../interfaces/intakes.reports';
import { DetailName, Fruit, Status } from '../interfaces/interfaces';

interface Props { children: JSX.Element | JSX.Element[] }


interface CreateContextProps {
    isLoading: boolean,
    mainData: MainData | null,
    fruit: Fruit,
    pallets: PalletState[],
    totalPallets: number,
    samples: number,
    limit: number,
    team: string | null,

    getMainDataNew: (fruit: Fruit) => void;
    handleMain: (val: string, item: keyof MainData) => void;
    setNewPallets: () => void;
    addPallet: (grower: boolean) => void;
    handleFruit: (fruit: string) => void;
    handleTeam: (team: string | null) => void;
    handleChecked: (pid: string, detailName: DetailName, name: string) => void;
    handleSwitch: (pid: string, detailName: DetailName, name: string) => void;
    handleInputText: (pid: string, detailName: DetailName, name: string, valor: string | number) => void;
    handleInputArray: (pid: string, detailName: DetailName, name: string, index: number, valor: string) => void;
    handleStatus: (pid: string, statusName: Status, value: string) => void;
    handleGrower: (pid: string, item: keyof NewGrower, value: string | number) => void;
    addTempFiles: (pid: string, files: ImageTemp[]) => void;
    addTempPhoto: (pid: string, file: ImageTemp, detailName: DetailName, nameId: string) => void;
    addGrower: () => void;
    addItem: (pid: string, detailName: DetailName, item: DetailObject) => void;
    backGrower: () => void;
    removeTempFiles: (pid: string, name: string) => void;
    removeTempPhoto: (pid: string, detailName: DetailName, name: string) => void;
    removePallet: (pid: string) => void;
    addRemoveSample: (action: "add" | "remove", pid: string) => void;
    cleanAll: () => void
}

export const CreateContext = createContext({} as CreateContextProps)

export const CreateProvider = ({ children }: Props) => {

    const [pallets, setPallets] = useState<PalletState[]>([])
    const [mainData, setMainData] = useState<MainData | null>(null)
    const [fruit, setFruit] = useState<Fruit>('other')
    const [totalPallets, setTotalPallets] = useState(0)
    const [allSamples, setAllSamples] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const [team, setTeam] = useState<string | null>(null)

    const limit: number = 10

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

    const handleMain = (val: string, item: keyof MainData) => {
        setMainData({
            ...mainData as MainData,
            [item]: val
        })
    }

    const handleTeam = (team: string | null) => {
        setTeam(team || null)
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



    const addTempFiles = (pid: string, files: ImageTemp[]) => {

        const imagesTotal = imagesLength(pallets)
        if (imagesTotal + files.length > 30) {
            alertMsg("Max. Images", "You completed the limit of 30 images in total")
            return
        }

        const newPallet = pallets.map(pall => {
            if (pall.id === pid) {

                return {
                    ...pall, images: [...pall.images, ...files]
                };
            }
            return pall;
        });
        setPallets(newPallet)
    };

    //-------------------------------------------------------

    const addTempPhoto = (pid: string, file: ImageTemp, detailName: DetailName, nameId: string) => {

        const newPallet = pallets.map(pall => {
            if (pall.id === pid) {
                return {
                    ...pall,
                    [detailName]: pall[detailName].map(w => {
                        if (w.name === nameId) {
                            return { ...w, photo: file }
                        }
                        return w
                    })
                };
            }
            return pall;
        });

        setPallets(newPallet)
    };

    //-------------------------------------------------------

    const removeTempFiles = (pid: string, name: string) => {

        const newPallet = pallets.map(pall => {
            if (pall.id === pid) {
                const newImages = pall.images.filter(img => img.name !== name)
                return {
                    ...pall, images: newImages
                };
            }
            return pall;
        });
        setPallets(newPallet)
    };

    const removeTempPhoto = (pid: string, detailName: DetailName, name: string) => {
        const newPallet = pallets.map(pall => {
            if (pall.id === pid) {
                return {
                    ...pall,
                    [detailName]: pall[detailName].map( w => {
                        if( w.name === name ){
                            return { ...w, photo: null }
                        }
                        return w
                    } )
                };
            }
            return pall;
        });

        setPallets(newPallet)
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

    const addRemoveSample = (action: "add" | "remove", pid: string) => {

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
            limit,
            team,
            getMainDataNew,
            handleMain,
            setNewPallets,
            addPallet,
            addTempFiles,
            handleFruit,
            handleTeam,
            addTempPhoto,
            handleChecked,
            handleSwitch,
            handleInputText,
            handleInputArray,
            handleStatus,
            handleGrower,
            addGrower,
            addItem,
            backGrower,
            removePallet,
            removeTempFiles,
            removeTempPhoto,
            addRemoveSample,

            cleanAll,
        }}>
            {children}
        </CreateContext.Provider>
    )
};
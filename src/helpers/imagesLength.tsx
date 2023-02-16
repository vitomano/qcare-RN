import { DataPrereport, PalletState } from "../interfaces/intakes.reports";


export const imagesLength = (pallets:DataPrereport[]|PalletState[]):number => {

    const imagesLength:number = pallets.map( pallet => pallet.images.length || 0 ).reduce((a, b) => a + b, 0)
    return imagesLength
};

export const photosLimit = (pallets:DataPrereport[]|PalletState[]) => {

    const imagesLength:number = pallets.map( pallet => pallet.images.length ).reduce((a, b) => a + b, 0)

    if(imagesLength < 20) return 10
    if(imagesLength >= 30) return undefined
    return 30 - imagesLength

};
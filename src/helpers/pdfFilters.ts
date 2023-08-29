import { Pallet } from "../interfaces/intakes.reports"
import { photosSavePDF } from "./photosToShow"

export const existPDFImages = (pallets:Pallet[]) => {
    const existImgs = pallets.every(pallet => pallet.images.length === 0)
    const existDefImgs = pallets.every(pallet => photosSavePDF(pallet as any).length === 0)

    if(existImgs && existDefImgs) {
        return false
    } else {
        return true
    }
}
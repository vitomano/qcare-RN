import { useEffect, useState } from "react"
import { Pallet, PrereportPallet } from "../interfaces/intakes.reports"
import { Photo, photosToShow } from "../helpers/photosToShow"

export const usePhoto = (pallet: PrereportPallet | Pallet) => {

    const [photos, setPhotos] = useState<Photo[]>([])
    useEffect(() => {
        setPhotos(photosToShow(pallet))
        return () => setPhotos([])
    }, [pallet])

    
    return { photos }
}
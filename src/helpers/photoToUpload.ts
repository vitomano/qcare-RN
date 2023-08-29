import qcareApi from "../api/qcareApi";
import { DataPrereport, DetailObject, ImageTemp, PalletState } from "../interfaces/intakes.reports";
import { DetailName } from "../interfaces/interfaces";

interface PhotoToUpload {
    repId: string,
    pid: string,
    detailName: DetailName,
    nameId: string,
    photo: ImageTemp | null | undefined,
}

const newArr = (repId:string, pid:string, detailName:DetailName, arr:DetailObject[]):PhotoToUpload[] => {
    const newArr = arr.map(item => (
        {
            repId,
            pid,
            detailName,
            nameId: item.name,
            photo: item.photo as ImageTemp,
        }
    ))

    return newArr
}


export const photoToUpload = (repId: string, pallets: DataPrereport[] | PalletState[]) => {

    let allPhotos = []

    for (const pallet of pallets) {

        if (pallet.labels) {
            allPhotos.push(...newArr(repId, pallet.id, "labels", pallet.labels.filter(lab => (lab.photo && lab.check))))
        }

        if (pallet.appareance) {
            allPhotos.push(...newArr(repId, pallet.id, "appareance", pallet.appareance.filter(app => (app.photo && app.check))))
        }

        if (pallet.pallgrow) {
            allPhotos.push(...newArr(repId, pallet.id, "pallgrow", pallet.pallgrow.filter(pall => (pall.photo && pall.check))))
        }
    }

    return allPhotos
};


export const uploadPhoto = async (file:PhotoToUpload, prereport:boolean = false) => {
    const formData = new FormData();

    formData.append('preId', file.repId)
    formData.append('pid', file.pid)
    formData.append('detailName', file.detailName)
    formData.append('nameId', file.nameId)
    formData.append('uploady', file.photo)

    try {
        await qcareApi.post(`/${prereport ? "prereport" : "report"}/photos`, formData)
    } catch (error) {
        throw new Error('Something went wrong')
    }
}

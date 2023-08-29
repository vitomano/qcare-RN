import { ImageType, Pallet, PrereportPallet } from '../interfaces/intakes.reports';


export interface Photo {
  label: string
  name: string
  photo: ImageType
  detailName: string
}

export interface ImageTypeLabel extends ImageType{
  label?: string
}


export const photosToShow = (pallet:PrereportPallet | Pallet) => {
      
    let photos = []

    if (pallet.details.labels) {
      photos.push(...(pallet.details.labels.filter(item => item.photo).map( un => ({...un, detailName: "labels"}) )))
    }
    if (pallet.details.appareance) {
      photos.push(...(pallet.details.appareance.filter(item => item.photo).map( un => ({...un, detailName: "appareance"}) )))

    }
    if (pallet.details.pallgrow) {
      photos.push(...(pallet.details.pallgrow.filter(item => item.photo).map( un => ({...un, detailName: "pallgrow"}) )))
    }

    const photoArr:Photo[] = photos.map( photo => (
      {
        label: photo.label,
        name: photo.name,
        photo: photo.photo as ImageType,
        detailName: photo.detailName
      }
    ) )

    return photoArr
  };

  export const photosSavePDF = (pallet:PrereportPallet | Pallet):ImageTypeLabel[] => {
      
    let photos = []

    if (pallet.details.labels) {
      photos.push(...pallet.details.labels.filter(item => item.photo))
    }
    if (pallet.details.appareance) {
      photos.push(...pallet.details.appareance.filter(item => item.photo))

    }
    if (pallet.details.pallgrow) {
      photos.push(...pallet.details.pallgrow.filter(item => item.photo))
    }

    return photos.map( photo => ({ label: photo.label, ...photo.photo as ImageType }) ) 
  };


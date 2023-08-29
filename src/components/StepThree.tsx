import React, { useEffect } from 'react'
import { View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { globalStyles } from '../theme/globalStyles'
import { greenMain } from '../theme/variables'
import { TextApp } from './ui/TextApp'

import { MainDataSelect } from '../helpers/objToArray'
import { jsonKeyToString } from '../helpers/jsonToString'
import { mainDataValue } from '../helpers/eliminarEs'
import { ShareImages } from './ShareImages'
import { Pallet, ImageType } from '../interfaces/intakes.reports';
import { PropsPdfImages } from './Share'
import { photosSavePDF } from '../helpers/photosToShow'
import { ImagesPDF } from './ImagesPDF'

interface Props {
    pallets: Pallet[],
    images: PropsPdfImages[],
    setImages: (images: PropsPdfImages[]) => void
    defectImages: PropsPdfImages[]
    setDefectImages: (defectImages: PropsPdfImages[]) => void
    createLink: () => Promise<void>
    existImages: boolean
    setStep: (step: number) => void
}

export const StepThree = ({
    pallets,
    images,
    setImages,
    defectImages,
    setDefectImages,
    createLink,
    existImages,
}: Props) => {

    useEffect(() => {
        (async function () {
            if (!existImages) {
                await createLink()
            }
        })()
    }, [pallets, existImages, createLink])

    return (
        <View>
            <TextApp size='m' bold style={{ marginBottom: 25 }}>Select images</TextApp>

            {
                pallets.map((pallet, i) => (
                    <View key={pallet.pid} style={{ marginBottom: 15 }}>
                        <TextApp bold>Pallet {i + 1}</TextApp>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>

                            {
                                photosSavePDF(pallet).length > 0 &&
                                photosSavePDF(pallet).map(img => (
                                    <ImagesPDF
                                        key={img.key}
                                        pid={pallet.pid}
                                        images={defectImages}
                                        setImages={setDefectImages}
                                        img={img}
                                    />
                                ))
                            }

                            {
                                pallet.images.length > 0 &&
                                pallet.images.map(img => (
                                    <ImagesPDF
                                        key={img.key}
                                        pid={pallet.pid}
                                        images={images}
                                        setImages={setImages}
                                        img={img}
                                    />
                                ))

                            }
                        </View>
                    </View>
                ))
            }
        </View>
    )
}


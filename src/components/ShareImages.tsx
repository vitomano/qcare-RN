import React from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { ImageType, Report } from '../interfaces/intakes.reports'
import { check } from '../theme/variables'
import { PropsPdf } from './Share'
import { IconBtn } from './ui/IconBtn'
import { TextApp } from './ui/TextApp'

interface Props {
    data: Report
    pdfImages: PropsPdf[]
    setPdfImages: (item: PropsPdf[]) => void
}

const { width } = Dimensions.get("screen")

export const ShareImages = ({ data, pdfImages, setPdfImages }: Props) => {


    const select = (pid: string, image: ImageType) => {
        const newImages = pdfImages.map(newImg => {
            if (newImg.pid === pid) {
                const exist = newImg.images.some(i => i.key === image.key)
                if (exist) return {
                    pid: newImg.pid,
                    images: newImg.images.filter(img => img.key !== image.key)
                }

                else return {
                    pid: newImg.pid,
                    images: [...newImg.images, image]
                }
            }
            else return newImg

        })
        setPdfImages(newImages)
    }

    return (
        <>
            {
                pdfImages.length > 0 &&
                data.pallets.map((pallet, index) => (
                    <View key={pallet.pid} style={{ marginBottom: 15 }}>
                        <TextApp bold>Pallet {index + 1}</TextApp>
                        {
                            pallet.images.length > 0
                                ? <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
                                    {
                                        pallet.images.map(image => {

                                            const exist = pdfImages[index].images.some(img => img.key === image.key)

                                            return (
                                                <TouchableOpacity
                                                    onPress={() => select(pallet.pid, image)}
                                                    activeOpacity={.9}
                                                    style={{ width: "25%", height: width / 4 - 10, position: "relative" }}
                                                    key={image.key}
                                                >
                                                    <View style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}>
                                                        {
                                                            exist
                                                                ? <IconBtn iconSize={25} action={() => select(pallet.pid, image)} icon="checkmark-circle" background='white' iconColor={check} />
                                                                : <IconBtn iconSize={25} action={() => select(pallet.pid, image)} icon="ellipse-outline" iconColor="white" />
                                                        }
                                                    </View>
                                                    {/* <Icon style={{ position: "absolute", top: 3, right: 3, zIndex: 10 }} name={exist ? "checkmark-circle-sharp" : "ellipse-outline"} size={20} color={exist ? check : "#fff"} /> */}
                                                    <FastImage style={{ flex: 1, opacity: exist ? 1 : .6 }} source={{ uri: image.imgURL_low }} />
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                                : <TextApp color='mute'>No images</TextApp>
                        }

                        <View>
                        </View>
                    </View>
                ))
            }
        </>
    )
}

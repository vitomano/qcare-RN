import React, { useEffect } from 'react'
import { useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { IconBtn } from './ui/IconBtn'
import FastImage from 'react-native-fast-image'
import { TextApp } from './ui/TextApp'
import { ImageType } from '../interfaces/intakes.reports'
import { PropsPdfImages } from './Share'
import { check } from '../theme/variables'
import { ImageTypeLabel } from '../helpers/photosToShow'

interface Props {
    img: ImageTypeLabel,
    images: PropsPdfImages[],
    setImages: (images: PropsPdfImages[]) => void
    pid: string
}

export const ImagesPDF = ({ img, images, setImages, pid }: Props) => {

    const { width } = Dimensions.get("screen")

    const [checkRef, setCheckRef] = useState(true)
    const [exist, setExist] = useState<boolean>(false)

    // useEffect(() => {
    //     const pally = images.find(pall => pall.pid === pid)
    //     setCheckRef(pally!.images.some(i => i.imgURL === img.imgURL))
    //     return () => { setCheckRef(true) }
    // }, [images, img, pid])

    useEffect(() => {
        const exist = images.find(pall => pall.pid === pid)?.images.some(i => i.key === img.key) || false
        setExist(exist)
    }, [images])



    // const addImage = (url:ImageType) => {

    //     setCheckRef(!checkRef) 

    //     const elPallet:PropsPdfImages = images.find(pall => pall.pid === pid) || {pid, images:[]}
    //     const elResto:PropsPdfImages[] = images.filter(pall => pall.pid !== pid)

    //     if (!checkRef) {
    //         elPallet.images.push(url)
    //         setImages([...elResto, elPallet])
    //     } else {
    //         const newP = elPallet.images.filter(im => im.key !== url.key)
    //         elPallet.images = newP
    //         setImages([...elResto, elPallet])
    //     }
    // };

    const selectImage = (img: ImageTypeLabel) => {
        const findImage = images.find(pall => pall.pid === pid)
        if (findImage) {
            const exist = findImage.images.some(i => i.key === img.key)
            if (exist) {
                const newImages = findImage.images.filter(i => i.key !== img.key)
                setImages([...images.filter(pall => pall.pid !== pid), { pid, images: newImages }])
            } else {
                setImages([...images.filter(pall => pall.pid !== pid), { pid, images: [...findImage.images, img] }])
            }
        } else {
            setImages([...images, { pid, images: [img] }])
        }
    };

    return (
        <TouchableOpacity
            onPress={() => selectImage(img)}
            activeOpacity={.9}
            style={{ width: "25%", height: width / 4 - 10, position: "relative" }}
        >
            <View style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}>

                {
                    exist
                        ? <IconBtn iconSize={25} action={() => selectImage(img)} icon="checkmark-circle" background='white' iconColor={check} />
                        : <IconBtn iconSize={25} action={() => selectImage(img)} icon="ellipse-outline" iconColor="white" />
                    // : <IconBtn iconSize={25} action={() => select(pallet.pid, image)} icon="ellipse-outline" iconColor="white" />
                }
            </View>
            <FastImage style={{
                flex: 1,
                opacity: exist ? 1 : .6
            }} source={{ uri: img.imgURL_low }} />
        </TouchableOpacity>
    )
}

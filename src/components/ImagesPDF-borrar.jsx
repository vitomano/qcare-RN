import React, { useEffect } from 'react'
import { useState } from 'react'

export const ImagesPDF = ({ img, images, setImages, pid }) => {

    const [checkRef, setCheckRef] = useState(true)

    useEffect(() => {
        const pallet = images.find(pall => pall.pid === pid)
        setCheckRef(pallet.images.some(i => i.imgURL === img.imgURL))
        return () => { setCheckRef(true) }
    }, [images, img, pid])


    const addImage = (url) => {

        setCheckRef(!checkRef)

        const elPallet = images.find(pall => pall.pid === pid)
        const elResto = images.filter(pall => pall.pid !== pid)

        if (!checkRef) {
            elPallet.images.push(url)
            setImages([...elResto, elPallet])
        } else {
            const newP = elPallet.images.filter(im => im.imgURL !== url.imgURL)
            elPallet.images = newP
            setImages([...elResto, elPallet])
        }
    };

    return (

        <>
        {
            images.length > 0
                ? <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}>
                    {
                        images.map(image => {

                            // const exist = pdfImages[index].images.some(img => img.key === image.key)

                            return (
                                <TouchableOpacity
                                    onPress={() => select(pallet.pid, image)}
                                    activeOpacity={.9}
                                    style={{ width: "25%", height: width / 4 - 10, position: "relative" }}
                                    key={image.key}
                                >
                                    <View style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}>

                                    <IconBtn iconSize={25} action={() => select(pallet.pid, image)} icon="checkmark-circle" background='white' iconColor={check} />

                                        {/* {
                                            exist
                                                ? <IconBtn iconSize={25} action={() => select(pallet.pid, image)} icon="checkmark-circle" background='white' iconColor={check} />
                                                : <IconBtn iconSize={25} action={() => select(pallet.pid, image)} icon="ellipse-outline" iconColor="white" />
                                        } */}
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
        </>

    )
}

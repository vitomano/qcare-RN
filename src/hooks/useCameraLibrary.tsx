import BottomSheet from "@clip-sub/react-native-bottomsheet"
import { useEffect, useState } from "react"
import { Platform } from "react-native"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { alertMsg } from "../helpers/alertMsg"
import { ImageTemp } from "../interfaces/intakes.reports"


interface CallbackType { (resp: {
    files: ImageTemp[],
    cancel: boolean,
    error: boolean
}): void }

export const useCameraLibrary = (limit: number, exist: number) => {

    const [allowed, setAllowed] = useState<number>(0)

    useEffect(() => {
        setAllowed(limit - exist)
    }, [limit, exist])

    const showImagePicker = ( done:CallbackType ) => {

        BottomSheet.showBottomSheetWithOptions({
            options: ['Take Photo', 'Choose from Library', 'Cancel'],
            title: 'Select an option',
            dark: true,
            cancelButtonIndex: 2,
        }, (value) => {
            if (value === 0) {

                launchCamera({
                    mediaType: 'photo',
                    saveToPhotos: true
                }, (res) => {
                    if (res.didCancel) return done({
                        files: [],
                        cancel: true,
                        error: false
                    })
                    if (!res.assets) return done({
                        files: [],
                        cancel: false,
                        error: true
                    })
                    if (res.assets.length > allowed) return alertMsg("Max. Exceeded", `${allowed} images allowed`)

                    const newImages = res.assets.map(file => {
                        return {
                            uri: Platform.OS === 'ios' ? file?.uri?.replace('file://', '') : file.uri || undefined,
                            type: file.type,
                            name: file.fileName
                        }
                    })
                    return done({
                        files: newImages,
                        cancel: false,
                        error: false
                    })
                });

            } else if (value === 1) {

                launchImageLibrary({
                    mediaType: 'photo',
                    selectionLimit: allowed
                }, (res) => {
                    if (res.didCancel) return done({
                        files: [],
                        cancel: true,
                        error: false
                    })
                    if (!res.assets) return done({
                        files: [],
                        cancel: false,
                        error: true
                    })
                    if (res.assets.length > allowed) return alertMsg("Max. Exceeded", `${allowed} images allowed`)

                    const newImages = res.assets.map(file => {
                        return {
                            uri: Platform.OS === 'ios' ? file?.uri?.replace('file://', '') : file.uri || undefined,
                            type: file.type,
                            name: file.fileName
                        }
                    })
                    return done({
                        files: newImages,
                        cancel: false,
                        error: false
                    })
                })
            }
        });
    };

    return {
        showImagePicker,
        allowed,
    }

}

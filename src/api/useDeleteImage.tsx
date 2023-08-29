import { useMutation, useQueryClient } from "@tanstack/react-query";
import qcareApi from "./qcareApi";
import Toast from 'react-native-toast-message'

interface Props {
    reportId: string,
    prereport: boolean,
}

interface Image {
    reportId: string,
    palletId: string,
    keyName:  string,
    keyLow:   string,
    detailName?: string,
    itemName?: string
}

interface PropsImage extends Props {
    image: Image
}


//DELETE IMAGE
const deleteImage = async ({ image, reportId, prereport = false }: PropsImage) => {
    let revalidate = prereport ? 'prereport' : 'report'
    const { data } = await qcareApi.post(`/${revalidate}/delete-image`, image)
    return { data, revalidate, reportId }
}

//DELETE IMAGE
const deletePhotoDefect = async ({ image, reportId, prereport }: PropsImage) => {
    let revalidate = prereport ? 'prereport' : 'report'
    const { data } = await qcareApi.post(`/${revalidate}/delete-defect-image`, image)
    return { data, revalidate, reportId }
}



// ------------------------- HOOKS -------------------------


export const useDeleteImage = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteImage, {
        onSuccess: async (item) => {
            await queryClient.invalidateQueries([item.revalidate, item.reportId])
        }
    })
}


export const useDeletePhoto = () => {
    const queryClient = useQueryClient()
    return useMutation(deletePhotoDefect, {
        onSuccess: async (item) => {
            await queryClient.invalidateQueries([item.revalidate, item.reportId]),
            Toast.show({
                type: 'success',
                text1: 'Image has been deleted'
            })
        }
    })
}



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SinglePreReportResponse } from "../interfaces/intakes.reports";
import qcareApi from "./qcareApi";
import Toast from 'react-native-toast-message'

interface PropsDelete {
    reportId: string,
    palletId: string,
    key: string,
    key_low: string
}


const getSinglePrereports = async (id: string) => {
    const { data } = await qcareApi.get<SinglePreReportResponse>(`/prereport/${id}`)
    return data
};

const editItem = async (item: any) => {
    const { data } = await qcareApi.put('/prereport/edit-item', item)
    return data
};

const editCondition = async (status: any) => {
    const { data } = await qcareApi.put('/prereport/edit-condition', status)
    return data
};

const editGrower = async (grower: any) => {
    const { data } = await qcareApi.put('/prereport/edit-grower', grower)
    return data
};

export const uploadPallet = async (pallet: any) => {
    const { data } = await qcareApi.post(`/prereport/add-pallet`, pallet)
    return data
}

export const uploadImages = async (allData: any) => {

    const preId = allData.pid

    const formData = new FormData();

    for (const img of allData.pallets[0].images) {
        formData.append('uploady', img)
    }

    formData.append('preId', allData.repId)
    formData.append('palletId', preId)

    const { data } = await qcareApi.post('/prereport/images-prereport', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })

    return data
}

//DELETE IMAGE
export const deleteImage = async ({ reportId, palletId, key, key_low }: PropsDelete) => {

    const { data } = await qcareApi.post(`/prereport/delete-image`, {
        reportId,
        palletId,
        keyName: key,
        keyLow: key_low
    })
    return data
}


// ------------------------- HOOKS -------------------------

export const usePrereport = (id: string) => {
    return useQuery(
        ['prereport', id],
        () => getSinglePrereports(id),
        { select: (data) => { return data.singlePreReport } }
    );
}

export const useEditPrereport = () => {
    const queryClient = useQueryClient()
    return useMutation(editItem, {
        onSuccess: () => { queryClient.invalidateQueries(['prereport']) }
    })
}

export const useEditPreCondition = () => {
    const queryClient = useQueryClient()
    return useMutation(editCondition, {
        onSuccess: () => { queryClient.invalidateQueries(['prereport']) }
    })
}

export const useEditPreGrower = () => {
    const queryClient = useQueryClient()
    return useMutation(editGrower, {
        onSuccess: () => {
            queryClient.invalidateQueries(['prereport'])
            queryClient.refetchQueries(["prereports"])
        }
    })
}

export const useUploadImages = () => {
    const queryClient = useQueryClient()
    return useMutation(uploadImages, {
        onSuccess: () => { queryClient.invalidateQueries(['prereport']) }
    })
}

export const useDeletePrereportImage = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteImage, {
        onSuccess: () => {
            queryClient.invalidateQueries(['prereport']),
                Toast.show({
                    type: 'success',
                    text1: 'Image has been deleted'
                })
        },
        onError: () => Toast.show({
            type: 'error',
            text1: 'Something went wrong'
        })
    })
}
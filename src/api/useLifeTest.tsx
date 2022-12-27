import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SingleLifeTestResponse } from "../interfaces/interface.lifeTest";
import qcareApi from "./qcareApi";
import { Asset } from 'react-native-image-picker';


interface Props {
    images: Asset[],
    conditions: string[],
    lifeTestId: string,
    temperature: string,
    date: Date,
    dayNum: number
}

interface PropsEdit {
    lifeId: string,
    dayId: string,
    temperature: string,
    conditions: string[],
}

interface PropsDelete {
    lifeId: string,
    testId: string,
    key: string,
    key_low: string
}


const getSingleLifeTest = async (id: string) => {
    const { data } = await qcareApi.get<SingleLifeTestResponse>(`/life-test/${id}`)
    return data
};

// const editItem = async (item: any) => {
//     const { data } = await qcareApi.put('/prereport/edit-item', item)
//     return data
// };

// const editCondition = async (status: any) => {
//     const { data } = await qcareApi.put('/prereport/edit-condition', status)
//     return data
// };

// const editGrower = async (grower: any) => {
//     const { data } = await qcareApi.put('/prereport/edit-grower', grower)
//     return data
// };

// export const uploadPallet = async (pallet:any) => {
//     const {data} = await qcareApi.post(`/prereport/add-pallet`, pallet)
//     return data
// }

// export const uploadImages = async (allData:any) => {

//     const preId = allData.pid

//     const formData = new FormData();

//     for (const img of allData.pallets[0].images) {
//         formData.append('uploady', img)
//     }

//     formData.append('preId', allData.repId)
//     formData.append('palletId', preId)

//     const {data} =await qcareApi.post('/prereport/images-prereport', formData)

//     return data
// }

// export const removePrereport = async (id:string) => {
//     console.log(id)
//     const {data} = await qcareApi.get(`/prereport/delete/${id}`)
//     console.log(data)
//     return data
// }

export const updateStatus = async (lifeId: string) => {
    const { data } = await qcareApi.put(`/life-test/status/${lifeId}`)
    return data
}


//ADD DAY
export const addDay = async ({ images, conditions, lifeTestId, temperature, date, dayNum }: Props) => {

    const formData = new FormData();

    for (const img of images) {
        formData.append('multerLife', JSON.parse(JSON.stringify(img)))
    }

    for (const con of conditions) {
        formData.append('conditions', con)
    }

    formData.append('lifeTestId', lifeTestId)
    formData.append('temperature', temperature)
    formData.append('day_date', date)
    formData.append('day', dayNum)

    const { data } = await qcareApi.put('/life-test/add-day', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data
}

//ADD DAY
export const editDay = async ({ lifeId, dayId, conditions, temperature }: PropsEdit) => {

    const { data } = await qcareApi.put(`/life-test/edit-day`, {
        lifeId,
        dayId,
        conditions,
        temperature
    })
    return data
}


//DELETE IMAGE
export const deleteImage = async ({ lifeId, testId, key, key_low }: PropsDelete) => {
    const { data } = await qcareApi.post(`/life-test/delete-image`, {
        lifetestId: lifeId,
        testId,
        keyName: key,
        keyLow: key_low
    })
    return data
}


// ------------------------- HOOKS -------------------------


export const useLifeTest = (id: string) => {
    return useQuery(
        ['lifetest', id],
        () => getSingleLifeTest(id),
        { select: (data) => { return data?.singleLife } }
    );
}

export const useAddDay = () => {
    return useMutation(addDay)
}

export const useEditDay = () => {
    const queryClient = useQueryClient()
    return useMutation(editDay,
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['lifetest'])
            }
        }
    )
}

export const useUpdateStatus = () => {
    const queryClient = useQueryClient()
    return useMutation(updateStatus,
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['lifetest']),
                    queryClient.refetchQueries(["lifeTests"])
            }
        }
    )
}

export const useDeleteImage = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteImage, {
        onSuccess: () => { queryClient.invalidateQueries(['lifetest']) }
    })
}

// export const useEditPrereport = () => {
//     const queryClient = useQueryClient()
//     return useMutation(editItem, {
//         onSuccess: () => { queryClient.invalidateQueries(['lifetest']) }
//     })
// }

// export const useEditPreCondition = () => {
//     const queryClient = useQueryClient()
//     return useMutation(editCondition, {
//         onSuccess: () => { queryClient.invalidateQueries(['lifetest']) }
//     })
// }

// export const useEditPreGrower = () => {
//     const queryClient = useQueryClient()
//     return useMutation(editGrower, {
//         onSuccess: () => { queryClient.invalidateQueries(['lifetest']) }
//     })
// }

// export const useUploadImages = () => {
//     const queryClient = useQueryClient()
//     return useMutation(uploadImages, {
//         onSuccess: () => { queryClient.invalidateQueries(['lifetest']) }
//     })
// }

// export const useRemovePrereport = () => {
//     const queryClient = useQueryClient()
//     return useMutation(removePrereport, {
//         onSuccess: () => { queryClient.invalidateQueries(['prereport']) }
//     })
// }
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SingleLifeTestResponse } from "../interfaces/interface.lifeTest";
import qcareApi from "./qcareApi";
import { Asset } from 'react-native-image-picker'


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

interface PropsAddImg {
    lifeId: string,
    dayId: string,
    images: Asset[],
}


const getSingleLifeTest = async (id: string) => {
    const { data } = await qcareApi.get<SingleLifeTestResponse>(`/life-test/${id}`)
    return data
};


export const updateStatus = async (lifeId: string) => {
    const { data } = await qcareApi.put(`/life-test/status/${lifeId}`)
    return data
}


//ADD DAY
export const addDay = async ({ images, conditions, lifeTestId, temperature, date, dayNum }: Props) => {

    try {
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
        console.log("FETCH enviado")


        return data
    } catch (error) {
        console.log("FETCH NO")
        return error
    }
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

//DELETE LAST DAY
export const deleteLastDay = async ( id:string ) => {
    const { data } = await qcareApi.put(`/life-test/delete-day/${id}`)
    return data
}



//ADD DAY
export const addLifeImage = async ({lifeId, dayId, images}:PropsAddImg) => {

    const formData = new FormData();

    for (const img of images) {
        formData.append('multerLife', JSON.parse(JSON.stringify(img)))
    }

    formData.append('lifeId', lifeId)
    formData.append('dayId', dayId)
    
    const { data } = await qcareApi.put('/life-test/add-life-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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


export const useAddLifeImage = () => {
    const queryClient = useQueryClient()

    return useMutation(addLifeImage,
        {
            // onSuccess: () => {
            //     queryClient.invalidateQueries(['lifetest'])
            // },
            // onError(error) {
            //     queryClient.invalidateQueries(['lifetest'])
            // },
            onSettled: () => {
                // queryClient.invalidateQueries(['lifetest'])
                queryClient.refetchQueries(['lifetest'])
            }
        }
        )
}

export const useDeleteLastDay = () => {
    const queryClient = useQueryClient()

    return useMutation(deleteLastDay,
        { onSuccess: () => {
                queryClient.invalidateQueries(['lifetest'])
                queryClient.invalidateQueries(['lifeTests'])
            }
        })
}

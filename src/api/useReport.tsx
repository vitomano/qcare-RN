import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SingleReportResponse } from "../interfaces/intakes.reports";
import qcareApi from "./qcareApi";


const getSingleReport = async (id: string) => {
    const { data } = await qcareApi.get<SingleReportResponse>(`/report/${id}`);
    return data
};

const editGrower = async (grower: any) => {
    const { data } = await qcareApi.put('/report/edit-grower', grower)
    return data
};

const editItem = async (item: any) => {
    const { data } = await qcareApi.put('/report/edit-item', item)
    return data
};


// const editCondition = async (status: any) => {
//     const { data } = await qcareApi.put('/prereport/edit-condition', status)
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

//     const {data} =await qcareApi.post('/prereport/images-prereport', formData,{
//         headers: { 'Content-Type': 'multipart/form-data' }})

//     return data
// }

// export const removePrereport = async (id:string) => {
//     console.log(id)
//     const {data} = await qcareApi.get(`/prereport/delete/${id}`)
//     console.log(data)
//     return data
// }


// ------------------------- HOOKS -------------------------

export const useReport = (id: string) => {
    return useQuery(
        ['report', id],
        () => getSingleReport(id),
        { select: (data) => { return data.singleReport } }
    );
}


export const useEditReport = () => {
    const queryClient = useQueryClient()
    return useMutation(editItem, {
        onSuccess: () => { queryClient.invalidateQueries(['report']) }
    })
}


export const useEditRepGrower = () => {
    const queryClient = useQueryClient()
    return useMutation(editGrower, {
        onSuccess: () => { queryClient.invalidateQueries(['report']) }
    })
}
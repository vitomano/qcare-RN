import { useMutation, useQueryClient } from "@tanstack/react-query";
import qcareApi from "./qcareApi";
import { ObjectType } from "../interfaces/intakes.reports";

interface DataBody{
    reportId: string,
    discrepancies: ObjectType
}

interface Props {
    dataBody: any,
    prereport: boolean
}


const addDiscrepancy = async ({ dataBody, prereport }:Props) => {

    let revalidate
    let query

    if (prereport) {query = 'prereport/edit-discrepancy'; revalidate = 'prereport'}
    else {query = '/report/edit-discrepancy'; revalidate = 'report'}

    const { data } = await qcareApi.put(query, dataBody)
    return {data, revalidate}
};

// ------------------------- HOOKS -------------------------

export const useAddDiscrepancy = () => {
    const queryClient = useQueryClient()
    return useMutation(addDiscrepancy, {
        onSuccess: async(item) => await queryClient.invalidateQueries([item.revalidate]) 
    })
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IntakesResponse } from "../interfaces/intakes.reports";
import qcareApi from "./qcareApi";


const getAllIntakes = async () => {
    const { data } = await qcareApi.get<IntakesResponse>('/intakes')
    return data
};


export const removeIntake = async (id: string) => {
    const { data } = await qcareApi.delete(`/intakes/delete/${id}`);
    return data
}


// ------------------------- HOOKS -------------------------

export const useIntakes = () => {
    return useQuery(
        ['intakes'], getAllIntakes,
        { select: (data) => { return data.intakes } }
    );

}

export const useRemoveIntake = () => {
    const queryClient = useQueryClient()
    return useMutation(removeIntake, {
        onSuccess: () => { 
            queryClient.refetchQueries(['intakes']) 
        },
    })
}
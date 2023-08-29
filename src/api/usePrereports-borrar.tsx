import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Prereport, PrereportsResponse } from "../interfaces/intakes.reports";
import qcareApi from "./qcareApi";


const getAllPrereports = async ( page:number = 1 ) => {
    const { data } = await qcareApi.get<PrereportsResponse>(`/prereport?page=${page}`)
    return data
};


export const removePrereport = async (id:string) => {
    const { data } = await qcareApi.get(`/prereport/delete/${id}`);
    return data
}


// ------------------------- HOOKS -------------------------

export const usePrereports = ( ) => {
    const result = useInfiniteQuery(
        ['prereports'], ({ pageParam = 1 }) => getAllPrereports(pageParam),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.page === lastPage.totalPages) return false;
                return lastPage.page + 1;
            },
        }
    );

    const prereports: Prereport[] =
        result.data?.pages.reduce(
            (prevReport, page) => prevReport.concat(page?.prereports as any),
            []
        ) ?? [];

    return { ...result, prereports };

}



export const useRemovePrereport = () => {
    const queryClient = useQueryClient()
    return useMutation(removePrereport, {
        onSuccess: () => { queryClient.fetchInfiniteQuery(['prereports']) }
    })
}
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Prereport, PrereportsResponse } from "../interfaces/intakes.reports";
import qcareApi from "./qcareApi";

interface QueryParams{
    page: number;
    team?: string;
}

const getAllPrereports = async ( page:number, team: string | undefined ) => {

    const params:QueryParams = { page }
    if (team) { params.team = team }

    const { data } = await qcareApi.get<PrereportsResponse>("/prereport", { params })
    return data
};


export const removePrereport = async (id:string) => {
    const { data } = await qcareApi.get(`/prereport/delete/${id}`);
    return data
}


// ------------------------- HOOKS -------------------------

export const usePrereports = ( page:number, team: string | undefined ) => {
    const result = useInfiniteQuery(
        ['prereports', page, team],
        ({ pageParam = page }) => getAllPrereports(pageParam, team),
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
        onSuccess: async() => { await queryClient.invalidateQueries(['prereports']) }
        // onSuccess: () => { queryClient.fetchInfiniteQuery(['prereports']) }
    })
}
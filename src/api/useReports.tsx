import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AllReportsResponse, SingleReport } from '../interfaces/intakes.reports';
import qcareApi from "./qcareApi";

interface QueryParams{
    page: number;
    team?: string;
}

const getAllReports = async ( page:number, team: string | undefined ) => {

    const params:QueryParams = { page }
    if (team) { params.team = team }

    const { data } = await qcareApi.get<AllReportsResponse>("/report", { params })
    return data
};


export const removeReport = async (id: string) => {
    const { data } = await qcareApi.get(`/report/delete/${id}`);
    return data
}


// ------------------------- HOOKS -------------------------

export const useReports = ( page:number, team: string | undefined ) => {
    const result = useInfiniteQuery(
        ['reports', page, team],
        ({ pageParam = page }) => getAllReports(pageParam, team),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.page === lastPage.totalPages) return false;
                return lastPage.page + 1;
            },
        }
    );

    const reports: SingleReport[] =
        result.data?.pages.reduce(
            (prevReport, page) => prevReport.concat(page?.reports as any),
            []
        ) ?? [];

    return { ...result, reports };

}


export const useRemoveReport = () => {
    const queryClient = useQueryClient()
    return useMutation(removeReport, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['reports'])
            await queryClient.invalidateQueries((['lifeTests']))
        }
    })
}
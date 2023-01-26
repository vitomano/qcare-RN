import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FilterResponse, SingleReport } from '../interfaces/intakes.reports';
import qcareApi from "./qcareApi";


const getFilterReports = async (query: string) => {
    const { data } = await qcareApi.get<FilterResponse>(query)
    return data
};


export const removeReport = async (id: string) => {
    const { data } = await qcareApi.get(`/prereport/delete/${id}`);
    return data
}


// ------------------------- HOOKS -------------------------

export const useFilterReports = ( query: string ) => {
    const result = useInfiniteQuery(
        ['filter'], ({ pageParam = 1 }) => getFilterReports("/report/filter/search?page="+pageParam + query),
        {
            getNextPageParam: (lastPage) => {
                if (+lastPage.page === +lastPage.totalPages) return false;
                return +lastPage.page + 1;
            },
        }
    );

    const reports: SingleReport[] =
        result.data?.pages.reduce(
            (prevReport, page) => prevReport.concat(page?.result as any),
            []
        ) ?? [];

    return { ...result, reports};
}


export const useRemoveReport = () => {
    const queryClient = useQueryClient()
    return useMutation(removeReport, {
        onSuccess: () => { queryClient.fetchInfiniteQuery(['filter']) }
    })
}


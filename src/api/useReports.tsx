import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AllReportsResponse, SingleReport } from '../interfaces/intakes.reports';
import qcareApi from "./qcareApi";


const getAllReports = async (page: number = 1) => {
    const { data } = await qcareApi.get<AllReportsResponse>(`/report?page=${page}`)
    return data
};


export const removeReport = async (id: string) => {
    const { data } = await qcareApi.get(`/report/delete/${id}`);
    return data
}


// ------------------------- HOOKS -------------------------

export const useReports = () => {
    const result = useInfiniteQuery(
        ['reports'], ({ pageParam = 1 }) => getAllReports(pageParam),
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
        onSuccess: () => { queryClient.fetchInfiniteQuery(['reports']) }
        // onSuccess: () => { queryClient.refetchQueries(['prereports']) }
        // onSuccess: () => { queryClient.invalidateQueries(['prereports']) }
    })
}
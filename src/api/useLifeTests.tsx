import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { AllLifeTestResponse, LifeTest } from '../interfaces/interface.lifeTest';
import qcareApi from "./qcareApi";


const getLifeTests = async ( page:number = 1 ) => {
    const { data } = await qcareApi.get<AllLifeTestResponse>(`/life-test?page=${page}`)
    return data
};

// export const removePrereport = async (id:string) => {
//     const { data } = await qcareApi.get(`/prereport/delete/${id}`);
//     return data
// }


// ------------------------- HOOKS -------------------------

export const useLifeTests = ( ) => {
    const result = useInfiniteQuery(
        ['lifeTests'], ({ pageParam = 1 }) => getLifeTests(pageParam),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.page === lastPage.totalPages) return false;
                return lastPage.page + 1;
            },
        }
    );

    const lifeTests: LifeTest[] =
        result.data?.pages.reduce(
            (prevReport, page) => prevReport.concat(page?.allLifeTest as any),
            []
        ) ?? [];

    return { ...result, lifeTests };

}


// export const useRemovePrereport = () => {
//     const queryClient = useQueryClient()
//     return useMutation(removePrereport, {
//         onSuccess: () => { queryClient.fetchInfiniteQuery(['prereports']) }
//     })
// }
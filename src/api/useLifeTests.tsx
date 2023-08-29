import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { AllLifeTestResponse, LifeTest } from '../interfaces/interface.lifeTest';
import qcareApi from "./qcareApi";

interface QueryParams{
    page: number;
    team?: string;
}

const getLifeTests = async ( page:number, team: string | undefined ) => {

    const params:QueryParams = { page }
    if (team) { params.team = team }

    const { data } = await qcareApi.get<AllLifeTestResponse>("/life-test", { params })
    return data
};

// export const removePrereport = async (id:string) => {
//     const { data } = await qcareApi.get(`/prereport/delete/${id}`);
//     return data
// }


// ------------------------- HOOKS -------------------------

export const useLifeTests = ( page:number, team: string | undefined ) => {
    const result = useInfiniteQuery(
        ['lifeTests', page, team],
        ({ pageParam = page }) => getLifeTests(pageParam, team),
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
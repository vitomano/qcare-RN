import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Intake, IntakesResponse } from "../interfaces/intakes.reports";
import qcareApi from "./qcareApi";

interface QueryParams{
    page: number;
    team?: string;
}

const getAllIntakes = async ( page:number, team: string | undefined ) => {
    const params:QueryParams = { page }
    if (team) { params.team = team }
    const { data } = await qcareApi.get<IntakesResponse>('/intakes', { params })
    return data
};


export const removeIntake = async (id: string) => {
    const { data } = await qcareApi.delete(`/intakes/delete/${id}`);
    return data
}


// ------------------------- HOOKS -------------------------

// export const useIntakes = ( page:number, team: string | undefined ) => {
//     return useQuery(
//         ['intakes', page, team], 
//         () => getAllIntakes(page, team),
//         { select: (data) => { return data.intakes } }
//     );
// }
export const useIntakes = ( page:number, team: string | undefined ) => {
    const result = useInfiniteQuery(
        ['intakes', page, team], 
        ({ pageParam = page }) => getAllIntakes(pageParam, team),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.page === lastPage.totalPages) return false;
                return lastPage.page + 1;
            },
        }
    );

    const intakes: Intake[] =
    result.data?.pages.reduce(
        (prevReport, page) => prevReport.concat(page?.intakes as any),
        []
    ) ?? [];

return { ...result, intakes };
}

export const useRemoveIntake = () => {
    const queryClient = useQueryClient()
    return useMutation(removeIntake, {
        onSuccess: () => { 
            queryClient.refetchQueries(['intakes']) 
        },
    })
}
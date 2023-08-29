import { useInfiniteQuery } from "@tanstack/react-query";
import { AllLifeTestResponse, LifeTest } from "../interfaces/interface.lifeTest";
import qcareApi from "./qcareApi";

// interface QueryParams{
//     page:   number;
//     query?: string;
// }

const getFilterReports = async ( page:number, query:string ) => {
    const { data } = await qcareApi.get<AllLifeTestResponse>(`/life-test/filter/search?page=${page}${query}`)
    return data
};

// ------------------------- HOOKS -------------------------

export const useFilterLife = (  query: string ) => {
    const result = useInfiniteQuery(
        ['filterLife'],
        ({ pageParam = 1 }) => getFilterReports(pageParam, query),
        {
            getNextPageParam: (lastPage) => {
                if (+lastPage.page === +lastPage.totalPages) return false;
                return +lastPage.page + 1;
            },
        }
    );

    const lifeTests: LifeTest[] =
        result.data?.pages.reduce(
            (prevReport, page) => prevReport.concat(page?.allLifeTest as any),
            []
        ) ?? [];

    return { ...result, lifeTests};
}
import { useInfiniteQuery } from "@tanstack/react-query";
import { FilterLifeTest, LifeTest } from "../interfaces/interface.lifeTest";
import qcareApi from "./qcareApi";


const getFilterReports = async (query: string) => {
    const { data } = await qcareApi.get<FilterLifeTest>(query)
    return data
};

// ------------------------- HOOKS -------------------------

export const useFilterLife = ( query: string ) => {
    const result = useInfiniteQuery(
        ['filterLife'], ({ pageParam = 1 }) => getFilterReports("/life-test/filter/search?page="+pageParam + query),
        {
            getNextPageParam: (lastPage) => {
                if (+lastPage.page === +lastPage.totalPages) return false;
                return +lastPage.page + 1;
            },
        }
    );

    const lifeTests: LifeTest[] =
        result.data?.pages.reduce(
            (prevReport, page) => prevReport.concat(page?.result as any),
            []
        ) ?? [];

    return { ...result, lifeTests};
}
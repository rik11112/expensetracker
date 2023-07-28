import { Category, Prisma } from "@prisma/client";
import { getCategories } from "@src/services/services";
import { get } from "@src/util/request";
import {useQuery} from "@tanstack/react-query";
import { useEffect } from "react";

export default function useGetCategories(){
    const {
        isError,
        error,
        isFetching,
        data: categories,
        fetchStatus,
    } = useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    return {
        categories: categories!, // ! because we know it's not undefined because of SSR
        error,
        isError,
        isFetching,
        fetchStatus,
    };
}

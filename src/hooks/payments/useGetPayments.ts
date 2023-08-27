import { Category, Payment, Prisma } from "@prisma/client";
import { getPayments } from "@src/services/services";
import { get } from "@src/util/request";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { useEffect, useState } from "react";

type PaymentWithCategory = Payment & { category: Category, date: string };

export default function useGetPayments(){
    const queryClient = useQueryClient();
    const [months, setMonths] = useState<number>(1);

    const {
        isError,
        error,
        isFetching,
        data: payments,
        fetchStatus,
    } = useQuery<PaymentWithCategory[], Error>({
        queryKey: ['payments', months],
        queryFn: () => getPayments(months),
    });

    const changeMonths = (newMonths: number) => {
        setMonths(newMonths);
        // queryClient.invalidateQueries(['payments']);
    };

    return {
        payments: payments!, // ! because we know it's not undefined because of SSR
        error,
        isError,
        isFetching,
        fetchStatus,
        changeMonths,
    };
}

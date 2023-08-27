import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@src/util/request";

export interface CreatePaymentModel {
    amount: number;
    note?: string;
    categoryId: number;
}

export default function useCreatePayment() {
    const queryClient = useQueryClient();

    const {
        mutate: createPayment,
        isError: isCreatePaymentError,
        isLoading: isCreatePaymentLoading,
    } = useMutation(
        (payment: CreatePaymentModel) => post('api/payments', payment), {
        onSuccess: () => {
            queryClient.invalidateQueries();    // invalidate all queries because we don't know the key
        },
    });

    return {
        createPayment,
        isCreatePaymentError,
        isCreatePaymentLoading,
    };
}

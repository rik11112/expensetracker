import { del } from "@src/util/request";
import { useQueryClient, useMutation } from "@tanstack/react-query";


export default function useDeletePayment() {
    const queryClient = useQueryClient();

    const {
        mutate: deletePayment,
        isError: isDeletePaymentError,
    } = useMutation((id:number) => del(`api/payments/${id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    return {
        deletePayment,
        isDeletePaymentError,
    };
}
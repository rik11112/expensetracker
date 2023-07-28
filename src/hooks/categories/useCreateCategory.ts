import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@src/util/request";

export interface CreateCategoryModel {
    name: string;
    color: string;
}

export default function useCreateCategory() {
    const queryClient = useQueryClient();

    const {
        mutate: createCategory,
        isError: isCreateCategoryError,
        isLoading: isCreateCategoryLoading,
    } = useMutation(
        (category: CreateCategoryModel) => post('api/categories', category), {
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
        },
    });

    return {
        createCategory,
        isCreateCategoryError,
        isCreateCategoryLoading,
    };
}

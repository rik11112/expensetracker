import useGetCategories from "@src/hooks/categories/useGetCategories";
import Error from "@src/pages/_error";
import ListItem from "../ListItem";

export default function CategoryList() {
    const {
        categories,
        error,
        isError,
        isFetching,
        fetchStatus,
    } = useGetCategories();

    if (isError) return <Error message={error?.message} />

    const list = categories?.map((category) => {
        return (
            <div
                style={{ backgroundColor: category.color }}
                key={category.categoryId}
                className={`bar-shadow rounded-md text-3xl my-3 p-3 flex items-center text-white`}>
                {category.name}
            </div>
        )
    })

    return <>
        {list}
    </>
}
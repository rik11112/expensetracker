import Navbar from "@src/components/Navbar";
import CategoryList from "@src/components/categories/CategoryList";
import useCreateCategoryButton from "@src/hooks/categories/useCreateCategoryButton";
import prisma from "@src/lib/prisma";
import { getCategories } from "@src/services/services";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['categories'], () => prisma.category.findMany());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}

export default function Categories() {
    const {
        createButton,
        createCategoryFormModal,
        errorComponent,
    } = useCreateCategoryButton();

    return <>
        <Navbar currentPage="categories" />
        <section className="w-5/6 mx-auto min-h-screen pt-7">
            <h2 className="inline text-blue text-4xl h-6">Categories</h2>
            <div className="p-3">{createButton}</div>
            <CategoryList />
            {createCategoryFormModal}
            {errorComponent}
        </section>
    </>
}
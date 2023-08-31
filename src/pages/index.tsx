import Navbar from "@src/components/Navbar"
import displayPayments from "@src/components/payments/displayPayments"
import useCreatePaymentButton from "@src/hooks/payments/useCreatePaymentButton"
import prisma from "@src/lib/prisma"
import { getPaymentsFromMonths } from "@src/services/serverside/serversidefetching"
import { QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query"
import { GetServerSidePropsContext } from "next"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const queryClient = new QueryClient()

    await Promise.all([
        queryClient.prefetchQuery(["categories"], () => prisma.category.findMany()),
        queryClient.prefetchQuery(["payments", 1], () => getPaymentsFromMonths(1)),
    ])

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}

export default function Home() {
    const {
        selectMonths,
        paymentList,
        downloadButton,
        deleteModal,
    } = displayPayments();

    const {
        createButton,
        createPaymentFormModal,
        errorComponent,
    } = useCreatePaymentButton();


    return <>
        <Navbar currentPage="home" />
        <section className="w-5/6 mx-auto min-h-fit pt-7">
            <h2 className="inline text-blue text-4xl h-6">Payments</h2>
            <div className="p-3 flex justify-between items-center">{createButton} {selectMonths}</div>
            {paymentList}
            {createPaymentFormModal}
            {errorComponent}
            <div className="absolute right-5 top-24">
                {downloadButton}
            </div>
        </section>
        {deleteModal}
    </>
}

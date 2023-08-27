import displayPayments from "@src/components/payments/displayPayments"
import useCreatePaymentButton from "@src/hooks/payments/useCreatePaymentButton"
import prisma from "@src/lib/prisma"
import { getPaymentsFromMonths } from "@src/services/serverside/serversidefetching"
import { getCategories, getPayments } from "@src/services/services"
import { QueryClient, dehydrate, useQueryClient } from "@tanstack/react-query"
import { Navbar } from "flowbite-react"
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
    } = displayPayments();

    const {
        createButton,
        createPaymentFormModal,
        errorComponent,
    } = useCreatePaymentButton();


    return <>
        <Navbar />
        <section className="w-5/6 mx-auto min-h-screen pt-14">
            <h2 className="inline text-blue text-4xl h-6">Payments</h2>
            <div className="p-3 flex justify-between items-center">{createButton} {selectMonths}</div>
            {paymentList}
            {createPaymentFormModal}
            {errorComponent}
        </section>
    </>
}

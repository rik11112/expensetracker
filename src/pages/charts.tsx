import Navbar from '@src/components/Navbar';
import useDisplayPayments from '@src/components/payments/displayPayments';
import prisma from '@src/lib/prisma';
import {getPaymentsFromMonths} from '@src/services/serverside/serversidefetching';
import {QueryClient, dehydrate} from '@tanstack/react-query';
import {GetServerSidePropsContext} from 'next';
import ExpenseCatDistribution from '@src/components/charts/ExpenseCatDistribution';
import IncomeCatDistribution from '@src/components/charts/IncomeCatDistribution';
import BalanceOverTime from '@src/components/charts/BalanceOverTime';
import { useEffect } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(['categories'], () => prisma.category.findMany()),
        queryClient.prefetchQuery(['payments', 1], () => getPaymentsFromMonths(1)),
    ]);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export default function Home() {
    const {selectMonths, payments, downloadButton} = useDisplayPayments();

    if (!payments) return <div>Loading...</div>;

    return (
        <>
            <Navbar currentPage="charts" />
            <section className="w-5/6 mx-auto min-h-fit pt-7">
                <h2 className="inline text-blue text-4xl h-6">Charts</h2>
                <div className="p-3 flex justify-between items-center">
                    {selectMonths} {downloadButton}
                </div>
                <BalanceOverTime />
                <IncomeCatDistribution />
                <ExpenseCatDistribution />
            </section>
        </>
    );
}

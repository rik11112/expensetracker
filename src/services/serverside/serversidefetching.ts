import prisma from "@src/lib/prisma";

export async function getPaymentsFromMonths(months: number) {
    const payments = await prisma.payment.findMany({
        where: months === 0 ? {} : {
            date: {
                gte: new Date(new Date().setMonth(new Date().getMonth() - months)),
            },
        },
        include: {
            category: true,
        },
    });
    payments.forEach(payment => {
        // @ts-ignore
        payment.date = payment.date.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
    });
    return payments;
}
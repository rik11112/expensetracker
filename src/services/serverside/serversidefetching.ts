import prisma from "@src/lib/prisma";

export function getPaymentsFromMonths(months: number) {
    return prisma.payment.findMany({
        where: {
            date: {
                gte: new Date(new Date().setMonth(new Date().getMonth() - months)),
            },
        },
        include: {
            category: true,
        },
    });
}
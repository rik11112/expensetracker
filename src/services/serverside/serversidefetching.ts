import { Prisma } from "@prisma/client";
import prisma from "@src/lib/prisma";

export async function getPaymentsFromMonths(months: number) {
    let whereClause: Prisma.PaymentWhereInput | undefined;
    if (months == 0) {
        whereClause = {
            NOT: {
                paymentId: -1,
            }
        };
    } else {
        const limitDate = new Date();
        limitDate.setMonth(limitDate.getMonth() - months);
        whereClause = {
            date: {
                gte: limitDate,
            },
        };
    }
    const payments = await prisma.payment.findMany({
        where: whereClause,
        include: {
            category: true,
        },
        orderBy: {
            date: "desc", // Change to "desc" for descending order
        },
    });
    payments.forEach(payment => {
        // @ts-ignore
        payment.date = payment.date.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
    });
    return payments;
}
import { Prisma, PrismaClient } from "@prisma/client";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
import prisma from "@src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { jsDateToExcelDate } from "@src/util/excelFormatting";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const months = parseInt(req.query.months as string);

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

    try {
        // Fetch all Payments with their related Categories and sort by date
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
            payment.amount = payment.amount / 100;
        });

        // Create a CSV stream
        const csvStream = new Readable({
            read() {
                this.push(`date,amount,category,note\n`);
                for (const payment of payments) {
                    this.push(`${payment.date},${payment.amount},"${payment.note || ""}",${payment.category.name}\n`);
                }
                this.push(null); // End of stream
            },
        });

        // Set the response headers for CSV download
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=payments.csv");

        // Pipe the CSV stream to the response
        await pipeline(csvStream, res);

        // Close Prisma client
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
};
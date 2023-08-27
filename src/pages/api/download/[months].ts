import { Prisma } from "@prisma/client";
import prisma from "@src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import ExcelJS from "exceljs";

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
            include: {
                category: true,
            },
            orderBy: {
                date: "asc", // Change to "desc" for descending order
            },
        });

        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Payments");

        // Define worksheet columns
        worksheet.columns = [
            { header: "Date", key: "date", width: 20 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Note", key: "note", width: 30 },
            { header: "Category", key: "category", width: 20 },
        ];

        // Add data to the worksheet
        payments.forEach((payment) => {
            worksheet.addRow({
                date: payment.date.toISOString(), // Format the date as needed
                amount: payment.amount / 100,
                note: payment.note || "",
                category: payment.category.name,
            });
        });

        // Set the response headers for Excel file download
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=payments.xlsx");

        // Generate Excel file and send it as a response
        await workbook.xlsx.write(res);

        // Close Prisma client
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
};
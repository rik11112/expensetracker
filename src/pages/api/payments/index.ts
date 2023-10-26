import prisma from "@src/lib/prisma";
import handleErrorResult from "@src/util/serverside/errorresulthandler";
import isReqInvalid from "@src/util/serverside/validators";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            await addPayment(req, res);
            return;
        default:
            res.status(405).end();
            return;
    }
}

async function addPayment(req: NextApiRequest, res: NextApiResponse) {
    if (isReqInvalid(req, res, [
        { key: 'amount', type: 'number', dict: 'body' },
        { key: 'categoryId', type: 'number', dict: 'body' },
    ])) return;

    try {
        const date = req.body.date ? new Date(req.body.date) : new Date();
        const result = await prisma.payment.create({
            data: {
                amount: parseInt(req.body.amount),
                categoryId: parseInt(req.body.categoryId),
                note: req.body.note,
                date,
            },
        });
        res.status(200).json(result);
    } catch (e) {
        handleErrorResult(res, e, "Something went wrong while adding payment.");
    }
}
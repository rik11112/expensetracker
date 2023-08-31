import prisma from "@src/lib/prisma";
import handleErrorResult from "@src/util/serverside/errorresulthandler";
import isReqInvalid from "@src/util/serverside/validators";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'DELETE':
            deletePayment(req, res);
            return;
        default:
            res.status(405).end();
            return;
    }
}

async function deletePayment(req: NextApiRequest, res: NextApiResponse) {
    if (isReqInvalid(req, res, [
        { key: 'id', type: 'number', dict: 'query' },
    ])) return;

    try {
        const result = await prisma.payment.delete({
            where: {
                paymentId: parseInt(req.query.id as string),
            },
        });
        res.status(200).json(result);
    } catch (e) {
        handleErrorResult(res, e, "Something went wrong while deleting payment.");
    }
}
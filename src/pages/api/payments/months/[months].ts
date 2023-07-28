import prisma from "@src/lib/prisma";
import { getPaymentsFromMonths } from "@src/services/serverside/serversidefetching";
import handleErrorResult from "@src/util/serverside/errorresulthandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({message: 'Method not allowed'});
        return;
    }

    const months = parseInt(req.query.months as string);

    if (isNaN(months)) {
        res.status(400).json({message: 'Invalid months'});
        return;
    }

    try {

        const payments = await getPaymentsFromMonths(months);
    
        res.status(200).json(payments);
        return;
    } catch (e) {
        handleErrorResult(res, e);
    }
}
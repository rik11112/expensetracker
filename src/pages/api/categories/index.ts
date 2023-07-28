import prisma from "@src/lib/prisma";
import handleErrorResult from "@src/util/serverside/errorresulthandler";
import isReqInvalid from "@src/util/serverside/validators";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            res.status(200).json(await prisma.category.findMany()); // Quick and dirty but works for now
            return;
        case 'POST':
            await addCategory(req, res);
            return;
    }
}

async function addCategory(req: NextApiRequest, res: NextApiResponse) {
    if (isReqInvalid(req, res, [
        {key: 'name', type: 'string', dict: 'body'},
        {key: 'color', type: 'string', dict: 'body'},
    ])) return;

    try {
        const result = await prisma.category.create({
            data: {
                name: req.body.name,
                color: req.body.color,
            },
        });
        res.status(200).json(result);
    } catch (e) {
        handleErrorResult(res, e, "Something went wrong while adding category.");
    }
}
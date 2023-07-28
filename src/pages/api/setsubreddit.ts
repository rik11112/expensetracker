import { Prisma } from "@prisma/client";
import prisma from "@src/lib/prisma";
import isReqInvalid from "@src/util/serverside/validators";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    if (isReqInvalid(req, res, [
        { key: 'subreddit', type: 'string' }
    ])) return;

    const { subreddit } = req.body;

    try {
        const result = await prisma.setting.updateMany({
            where: {
                name: 'subreddit'
            },
            data: {
                value: subreddit
            },
        })

        if (result.count >= 1) {
            res.status(200).json({ message: 'Subreddit setting updated' });
            return;
        }

        // if no rows were updated, create a new one
        await prisma.setting.create({
            data: {
                name: 'subreddit',
                value: subreddit
            }
        })
        res.status(201).json({ message: 'Subreddit setting created' });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({ message: err.message, code: err.code });
            return;
        }
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
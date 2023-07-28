import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next";

export default function handleErrorResult(res: NextApiResponse, error: any, fallbackmessage?: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({message: error.message, code: error.code});
    } else if (error instanceof Error) {
        res.status(500).json({message: error.message});
    } else if (fallbackmessage) {
        res.status(500).json({message: fallbackmessage});
    } else {
        res.status(500).json({message: 'Unknown error'});
    }
}
import { NextApiRequest, NextApiResponse } from "next";

type checkType = "string" | "number" | "array";
export type Key = { key: string, type: checkType, dict?: "body" | "query" };

export default function isReqInvalid(
    req: NextApiRequest,
    res: NextApiResponse<any>,
    keys: Key[]
): boolean {
    const typeCheckers = {
        string: (val: string) => val && val.length > 0,
        number: (val: any) => !isNaN(val),
        array: (val: any) => Array.isArray(val),
    }

    for (const { key, type, dict } of keys) {
        const isValid = typeCheckers[type];
        if (!isValid(req[dict ?? "body"][key])) {
            res.status(400).json({ message: `Missing ${key}` }) // TODO: apparte functie van maken.
            return true;
        }
    }
        
    return false;
}
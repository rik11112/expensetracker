import isReqInvalid from "@src/util/serverside/validators";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            addPayment(req, res);
            return;
    }
}

function addPayment(req: NextApiRequest, res: NextApiResponse) {
    if (isReqInvalid(req, res, [
        {key: 'amount', type: 'number', dict: 'body'},
        {key: 'categoryId', type: 'number', dict: 'body'},
    ])) return;
}

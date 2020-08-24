import { Request, Response } from 'express';

export default function(req: Request, res: Response) {
    const { body } = req;

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: String(0)
    });
};

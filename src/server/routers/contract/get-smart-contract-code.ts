import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { notSupport } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;

    return res.json(notSupport(body.id, body.jsonrpc, body.method));
};

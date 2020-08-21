import { Request, Response } from 'express';
import { BlockChain } from '../../common';

export default function(req: Request, res: Response) {
    const { chain: BlockChain } = req.app.settings;

    return res.json({
        
    });
};

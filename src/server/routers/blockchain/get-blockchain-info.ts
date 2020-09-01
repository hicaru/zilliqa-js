import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { internalError } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            CurrentDSEpoch: String(chain.numDSBlocks),
            CurrentMiniEpoch: "0",
            DSBlockRate: 1,
            NumDSBlocks: String(Number(chain.numDSBlocks) + 1),
            NumPeers: 0,
            NumTransactions: "4350627",
            NumTxBlocks: String(chain.numTxBlocks),
            NumTxnsDSEpoch: "748",
            NumTxnsTxEpoch: "0",
            ShardingStructure: {
                NumPeers: [0]
            },
            TransactionRate: 100,
            TxBlockRate: 10
        }
    });
};

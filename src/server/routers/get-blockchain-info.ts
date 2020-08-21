import { Request, Response } from 'express';
import { BlockChain } from '../../common';
import { RPCErrorCode } from '../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastDSBlock = chain.getLastBlock;

    if (!lastDSBlock) {
        return res.json({
            code: RPCErrorCode.RPC_INTERNAL_ERROR
        });
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            CurrentDSEpoch: String(lastDSBlock.blockHeader.blockNum),
            CurrentMiniEpoch: "0",
            DSBlockRate: 1,
            NumDSBlocks: String(chain.dsBlocks.size),
            NumPeers: 0,
            NumTransactions: "4350627",
            NumTxBlocks: String(chain.txBlocks.size),
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

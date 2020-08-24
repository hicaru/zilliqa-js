import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode } from '../../errors';
import { ZERO_HASH } from '../../../config';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const [id] = body.params;
    const txBlock = chain.getTXBlock(Number(id));
    const rootTxBlock = chain.getTXBlock(0);

    if (!txBlock || !rootTxBlock) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.RPC_INTERNAL_ERROR,
                message: 'INTERNAL_ERROR: no found txBlock or rootTxBlock.'
            }
        });
    }

    if (!id) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.RPC_INVALID_PARAMS,
                message: 'INVALID_PARAMS: Invalid method parameters (invalid name and/or type) recognised'
            }
        });
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            body: {
                BlockHash: txBlock.blockHash,
                HeaderSign: txBlock.getHeader().headerSign(),
                MicroBlockInfos: []
              },
              header: {
                BlockNum: txBlock.getHeader().blockNum,
                DSBlockNum: txBlock.getHeader().dsBlockNum,
                GasLimit: String(txBlock.getHeader().gasLimit),
                GasUsed: '0',
                MbInfoHash: ZERO_HASH,
                MinerPubKey: txBlock.getHeader().minerPubKey,
                NumMicroBlocks: 0,
                NumTxns: txBlock.transactions.size(),
                PrevBlockHash: txBlock.getHeader().prevHash,
                Rewards: "0",
                StateDeltaHash: ZERO_HASH,
                StateRootHash: rootTxBlock?.blockHash,
                Timestamp: String(txBlock.timestamp),
                Version: Number(txBlock.getHeader().version)
              }
        }
    });
};

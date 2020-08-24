import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode } from '../../errors';
import { ZERO_HASH } from '../../../config';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const txBlock = chain.getLastTXBlock;
    const rootTxBlock = chain.getTXBlock(0);

    if (!rootTxBlock || !txBlock) {
        return res.json({
            code: RPCErrorCode.RPC_INTERNAL_ERROR
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

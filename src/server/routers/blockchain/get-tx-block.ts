import { Request, Response } from 'express';
import { BlockChain, CircularArray } from '../../../common';
import { internalError, invalidParams } from '../../errors';
import { ZERO_HASH } from '../../../config';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const [id] = body.params;
    const txBlock = chain.txBlockchain.getBlock(Number(id));
    const rootTxBlock = chain.txBlockchain.getBlock(0);
    let numTxns = 0;

    if (!txBlock || !rootTxBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found txBlock or rootTxBlock.'));
    }

    if (!id) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    if (!txBlock) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            result: {
                header: {
                    BlockNum: '18446744073709551615',
                    Difficulty: 0,
                    DifficultyDS: 0,
                    GasPrice: '0',
                    LeaderPubKey: '0x' + ZERO_HASH,
                    PoWWinners: [],
                    PrevHash: ZERO_HASH,
                    Timestamp: '0'
                  },
                  signature: ZERO_HASH
            }
        });
    }

    if (txBlock.transactions instanceof CircularArray) {
        numTxns = txBlock.transactions.size();
    } else {
        numTxns = (txBlock.transactions as any).length;
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
                NumTxns: numTxns,
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

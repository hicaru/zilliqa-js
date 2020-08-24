import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastDsBlock = chain.getLastDSBlock;

    if (!lastDsBlock) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.RPC_INTERNAL_ERROR,
                message: 'INTERNAL_ERROR: no found DsBlock.'
            }
        });
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            header: {
                BlockNum: String(lastDsBlock.blockHeader.blockNum),
                Difficulty: chain.difficulty,
                DifficultyDS: chain.dsDifficulty,
                GasPrice: String(chain.defaultGasPrice),
                LeaderPubKey: String(chain.defaultMiner),
                PoWWinners: [],
                PrevHash: String(lastDsBlock.blockHeader.prevHash),
                Timestamp: String(lastDsBlock.timestamp)
              },
              signature: lastDsBlock.blockHash
        }
    });
};
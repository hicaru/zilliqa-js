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
            header: {
                BlockNum: String(lastDSBlock.blockHeader.blockNum),
                Difficulty: chain.difficulty,
                DifficultyDS: chain.dsDifficulty,
                GasPrice: String(chain.defaultGasPrice),
                LeaderPubKey: String(chain.defaultMiner),
                PoWWinners: [],
                PrevHash: String(lastDSBlock.blockHeader.prevHash),
                Timestamp: String(lastDSBlock.timestamp)
              },
              signature: lastDSBlock.blockHash
        }
    });
};

import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { internalError } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastDsBlock = chain.dsBlockchain.lastBlock;

    if (!lastDsBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found DsBlock.'));
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

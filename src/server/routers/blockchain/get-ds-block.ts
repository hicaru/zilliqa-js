import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { invalidParams } from '../../errors';
import { ZERO_HASH } from '../../../config';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const [id] = body.params;
    const dsBlock = chain.dsBlockchain.getBlock(Number(id));

    if (!id) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    if (!dsBlock) {
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

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            header: {
                BlockNum: String(dsBlock.blockHeader.blockNum),
                Difficulty: chain.difficulty,
                DifficultyDS: chain.dsDifficulty,
                GasPrice: String(chain.defaultGasPrice),
                LeaderPubKey: String(chain.defaultMiner),
                PoWWinners: [],
                PrevHash: String(dsBlock.blockHeader.prevHash),
                Timestamp: String(dsBlock.timestamp)
              },
              signature: dsBlock.blockHash
        }
    });
};

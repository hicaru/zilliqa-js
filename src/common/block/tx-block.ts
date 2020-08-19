import BN from 'bn.js';

import { BaseBlock, BaseBlockHeader } from './base-block';
import { CircularArray } from '../circular-array';
import { Transaction } from '../transaction';

export class TxBlockHeader extends BaseBlockHeader {
    gasLimit: BN;
    gasUsed: BN;
    rewards: BN;
    hashset: string[];
    numTxs: number;
    minerPubKey: string;
    dsBlockNum: number;

    constructor(
        version: BN,
        committeeHash: string,
        gasLimit: BN,
        gasUsed: BN,
        rewards: BN,
        blockNum: number,
        hashset: string[],
        numTxs: number,
        minerPubKey: string,
        dsBlockNum: number
    ) {
        super(version, committeeHash, blockNum);

        this.gasLimit = gasLimit;
        this.gasUsed = gasUsed;
        this.rewards = rewards;
        this.hashset = hashset;
        this.numTxs = numTxs;
        this.minerPubKey = minerPubKey;
        this.dsBlockNum = dsBlockNum;
    }
}

export class TxBlock extends BaseBlock {
    transactions = new CircularArray<Transaction>();

    constructor(
        timestamp: number,
        difficulty: number,
        txBlockInfo: TxBlockHeader
    ) {
        super(timestamp, difficulty, txBlockInfo);
    }

    serialize(): string {
        const header = this.getHeader() as TxBlockHeader;

        return JSON.stringify({
            timestamp: this.timestamp,
            difficulty: this.difficulty,
            gasLimit: header.gasLimit,
            rewards: header.rewards,
            minerPubKey: header.minerPubKey,
            numTxs: header.numTxs,
            dsBlockNum: header.dsBlockNum,
            transactions: this.transactions.list
        });
    }
}

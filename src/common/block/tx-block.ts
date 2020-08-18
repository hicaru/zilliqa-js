import BN from 'bn.js';

import { BaseBlock, BaseBlockHeader } from 'src/common/block/base-block';
import { MicroBlockInfo } from 'types';

export class MicroBlockHeader extends BaseBlockHeader {
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
    microBlockInfo: MicroBlockInfo;

    constructor(
        timestamp: number,
        difficulty: number,
        txBlockHeader: MicroBlockHeader,
        microBlockInfo: MicroBlockInfo
    ) {
        super(timestamp, difficulty, txBlockHeader);

        this.microBlockInfo = microBlockInfo;
    }
}

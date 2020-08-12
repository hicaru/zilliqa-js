import BN from 'bn.js';

import { BaseBlock, BaseBlockHeader } from 'src/common/block/base-block';
import { MicroBlockInfo, CoSignatures } from 'types';

export class MicroBlockHeader extends BaseBlockHeader {
    gasLimit: BN;
    gasUsed: BN;
    rewards: BN;
    blockNum: number;
    hashset: string[];
    numTxs: number;
    minerPubKey: string;
    dsBlockNum: number;

    constructor(
        version: BN,
        committeeHash: string,
        prevHash: string,
        gasLimit: BN,
        gasUsed: BN,
        rewards: BN,
        blockNum: number,
        hashset: string[],
        numTxs: number,
        minerPubKey: string,
        dsBlockNum: number
    ) {
        super(version, committeeHash, prevHash);

        this.gasLimit = gasLimit;
        this.gasUsed = gasUsed;
        this.rewards = rewards;
        this.blockNum = blockNum;
        this.hashset = hashset;
        this.numTxs = numTxs;
        this.minerPubKey = minerPubKey;
        this.dsBlockNum = dsBlockNum;
    }
}

export class TxBlock extends BaseBlock {
    txBlockHeader: MicroBlockHeader;
    microBlockInfo: MicroBlockInfo;

    constructor(
        blockHash: string,
        timestamp: number,
        cosigs: CoSignatures,
        txBlockHeader: MicroBlockHeader,
        microBlockInfo: MicroBlockInfo
    ) {
        super(blockHash, timestamp, cosigs);

        this.microBlockInfo = microBlockInfo;
        this.txBlockHeader = txBlockHeader;
    }
}

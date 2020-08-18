import BN from 'bn.js';
import { BaseBlock, BaseBlockHeader } from 'src/common/block/base-block';

export class MicroBlockHeader extends BaseBlockHeader {
    shardId: number;
    gasLimit: BN;
    rewards: BN;
    epochNum: BN;
    hashset: string[];
    numTxs: number;
    minerPubKey: string;
    dsBlockNum: number;

    constructor(
        version: BN,
        committeeHash: string,
        shardId: number,
        gasLimit: BN,
        rewards: BN,
        epochNum: BN,
        hashset: string[],
        numTxs: number,
        minerPubKey: string,
        dsBlockNum: number
    ) {
        super(version, committeeHash);

        this.gasLimit = gasLimit;
        this.rewards = rewards;
        this.epochNum = epochNum;
        this.hashset = hashset;
        this.numTxs = numTxs;
        this.minerPubKey = minerPubKey;
        this.dsBlockNum = dsBlockNum;
        this.shardId = shardId;
    }
}

export class MicroBlock extends BaseBlock {
    hashes: string[];

    constructor(
        timestamp: number,
        difficulty: number,
        microBlockHeader: MicroBlockHeader,
        hashes: string[]
    ) {
        super(timestamp, difficulty, microBlockHeader);

        this.hashes = hashes;
    }
}

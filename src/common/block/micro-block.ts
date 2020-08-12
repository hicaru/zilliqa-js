import BN from 'bn.js';
import { BaseBlock, BaseBlockHeader } from 'src/common/block/base-block';
import { CoSignatures } from 'types';

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
        prevHash: string,
        shardId: number,
        gasLimit: BN,
        rewards: BN,
        epochNum: BN,
        hashset: string[],
        numTxs: number,
        minerPubKey: string,
        dsBlockNum: number
    ) {
        super(version, committeeHash, prevHash);

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
    microBlockHeader: MicroBlockHeader;
    hashes: string[];

    constructor(
        blockHash: string,
        timestamp: number,
        cosigs: CoSignatures,
        microBlockHeader: MicroBlockHeader,
        hashes: string[]
    ) {
        super(blockHash, timestamp, cosigs);

        this.microBlockHeader = microBlockHeader;
        this.hashes = hashes;
    }
}

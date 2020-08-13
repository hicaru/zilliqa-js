import BN from 'bn.js';
import { BaseBlock, BaseBlockHeader } from 'src/common/block/base-block';
import { CoSignatures } from 'types';

export class FBBlockHeader extends BaseBlockHeader {
    fallbackDSEpochNo: number;
    fallbackEpochNo: number;
    fallbackState: number;
    hashset: string[];
    leaderConsensusId: number;
    leaderNetworkInfo: string;
    leaderPubKey: string;
    shardId: number;

    constructor(
        version: BN,
        committeeHash: string,
        prevHash: string,
        fallbackDSEpochNo: number,
        fallbackEpochNo: number,
        fallbackState: number,
        hashset: string[],
        leaderConsensusId: number,
        leaderNetworkInfo: string,
        leaderPubKey: string,
        shardId: number
    ) {
        super(version, committeeHash, prevHash);

        this.fallbackDSEpochNo = fallbackDSEpochNo;
        this.fallbackEpochNo = fallbackEpochNo;
        this.fallbackState = fallbackState;
        this.hashset = hashset;
        this.leaderConsensusId = leaderConsensusId;
        this.leaderNetworkInfo = leaderNetworkInfo;
        this.leaderPubKey = leaderPubKey;
        this.shardId = shardId;
    }
}

export class FBBlock extends BaseBlock {
    constructor(
        blockHash: string,
        timestamp: number,
        cosigs: CoSignatures,
        fallbackBlockHeader: FBBlockHeader
    ) {
        super(blockHash, timestamp, cosigs, fallbackBlockHeader);
    }
}

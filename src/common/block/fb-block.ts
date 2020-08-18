import BN from 'bn.js';
import { BaseBlock, BaseBlockHeader } from './base-block';

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
        fallbackDSEpochNo: number,
        fallbackEpochNo: number,
        fallbackState: number,
        hashset: string[],
        leaderConsensusId: number,
        leaderNetworkInfo: string,
        leaderPubKey: string,
        shardId: number
    ) {
        super(version, committeeHash);

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
        timestamp: number,
        difficulty: number,
        fallbackBlockHeader: FBBlockHeader
    ) {
        super(timestamp, difficulty, fallbackBlockHeader);
    }
}

import BN from 'bn.js';
import { BaseBlock, BaseBlockHeader } from './base-block';

export class DSBlockHeader extends BaseBlockHeader {
    dsDifficulty: number;
    difficulty: number;
    leaderPubKey: string;
    epochNum: number;
    gasPrice: BN;

    constructor(
        version: BN,
        prevHash: string,
        dsDifficulty: number,
        difficulty: number,
        leaderPubKey: string,
        blockNum: number,
        epochNum: number,
        gasPrice: BN
    ) {
        super(version, prevHash, blockNum);

        this.dsDifficulty = dsDifficulty;
        this.difficulty = difficulty;
        this.leaderPubKey = leaderPubKey;
        this.epochNum = epochNum;
        this.gasPrice = gasPrice;
    }
}

export class DSBlock extends BaseBlock {
    constructor(
        timestamp: number,
        difficulty: number,
        dsBlockHeader: DSBlockHeader
    ) {
        super(timestamp, difficulty, dsBlockHeader);

        this._updateHash();
    }
}

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

    serialize(): string {
        const header = this.getHeader() as DSBlockHeader;

        return JSON.stringify({
            timestamp: this.timestamp,
            difficulty: this.difficulty,
            dsDifficulty: header.dsDifficulty,
            leaderPubKey: header.leaderPubKey,
            epochNum: header.epochNum,
            gasPrice: header.gasPrice
        });
    }

    isValid(): boolean {
        if (this.blockHash !== this.calculateHash()) {
            return false;
        }

        const header = this.getHeader() as DSBlockHeader;

        return this
            .blockHash
            .substring(0, header.dsDifficulty) !== Array(header.dsDifficulty + 1)
            .join('0');
    }
}

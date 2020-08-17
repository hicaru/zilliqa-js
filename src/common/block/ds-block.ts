import BN from 'bn.js';
import { BaseBlock, BaseBlockHeader } from 'src/common/block/base-block';
import { SWInfo } from 'src/common/sw-info';
import { CoSignatures } from 'types';

export class DSBlockHeader extends BaseBlockHeader {
    dsDifficulty: number;
    difficulty: number;
    leaderPubKey: string;
    epochNum: number;
    gasPrice: BN;
    swInfo: SWInfo;
    PoWDSWinners: string[];
    removeDSNodePubkeys: string;
    hashset: string[];

    constructor(
        version: BN,
        committeeHash: string,
        prevHash: string,
        dsDifficulty: number,
        difficulty: number,
        leaderPubKey: string,
        blockNum: number,
        epochNum: number,
        gasPrice: BN,
        swInfo: SWInfo,
        PoWDSWinners: string[],
        removeDSNodePubkeys: string,
        hashset: string[]
    ) {
        super(version, committeeHash, prevHash, blockNum);

        this.dsDifficulty = dsDifficulty;
        this.difficulty = difficulty;
        this.leaderPubKey = leaderPubKey;
        this.epochNum = epochNum;
        this.gasPrice = gasPrice;
        this.swInfo = swInfo;
        this.PoWDSWinners = PoWDSWinners;
        this.removeDSNodePubkeys = removeDSNodePubkeys;
        this.hashset = hashset;
    }
}

export class DSBlock extends BaseBlock {
    constructor(
        timestamp: number,
        difficulty: number,
        cosigs: CoSignatures,
        dsBlockHeader: DSBlockHeader
    ) {
        super(timestamp, difficulty, cosigs, dsBlockHeader);

        this._updateHash();
    }
}

import BN from 'bn.js';
import { BaseBlock, BaseBlockHeader } from './base-block';
import { TxBlock } from './tx-block';
import { validator } from '../../crypto';
import { CircularArray } from '../circular-array';

export class DSBlockHeader extends BaseBlockHeader {
    dsDifficulty: number;
    difficulty: number;
    leaderPubKey: string;
    gasPrice: BN;

    constructor(
        version: BN,
        prevHash: string,
        dsDifficulty: number,
        difficulty: number,
        leaderPubKey: string,
        blockNum: number,
        gasPrice: BN
    ) {
        super(version, prevHash, blockNum);

        this.dsDifficulty = dsDifficulty;
        this.difficulty = difficulty;
        this.leaderPubKey = leaderPubKey;
        this.gasPrice = gasPrice;
    }
}

export class DSBlock extends BaseBlock {
    public txBlocks = new CircularArray<TxBlock>();

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
            gasPrice: header.gasPrice.toString(),
            txBlocks: this.txBlocks.list
        });
    }

    /**
     * Starts the mining process on the block. It changes the 'nonce' until the hash
     * of the block starts with enough zeros (= difficulty)
     */
    isValid(): boolean {
        if (this.blockHash !== this.calculateHash()) {
            return false;
        }

        const header = this.getHeader() as DSBlockHeader;
        const blocks = Object.keys(this.txBlocks.list);

        for (let index = 0; index < blocks.length; index++) {
            const key = Number(blocks[index]);
            const txBlock = this.txBlocks.list[key];

            if (!txBlock.isValid()) {
                return false;
            }
        }

        return validator(this.blockHash, header.dsDifficulty);
    }
}

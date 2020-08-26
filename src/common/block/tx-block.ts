import BN from 'bn.js';
import { SHA256 } from 'crypto-js';

import { BaseBlock, BaseBlockHeader } from './base-block';
import { CircularArray } from '../circular-array';
import { Transaction } from '../transaction';
import { validator } from '../../crypto';

export class TxBlockHeader extends BaseBlockHeader {
    gasLimit: BN;
    minerPubKey: string;
    dsBlockNum: number;

    constructor(
        version: BN,
        gasLimit: BN,
        blockNum: number,
        prevHash: string,
        minerPubKey: string,
        dsBlockNum: number
    ) {
        super(version, prevHash, blockNum);

        this.gasLimit = gasLimit;
        this.minerPubKey = minerPubKey;
        this.dsBlockNum = dsBlockNum;
    }

    headerSign() {
        return SHA256(JSON.stringify(this)).toString();
    }
}

export class TxBlock extends BaseBlock {
    transactions = new CircularArray<Transaction>();
    blockHeader!: TxBlockHeader;

    constructor(
        timestamp: number,
        difficulty: number,
        txBlockInfo: TxBlockHeader
    ) {
        super(timestamp, difficulty, txBlockInfo);

        this._updateHash();
    }

    /**
     * Returns the header of the block.
     *
     * The header is used to calculate the hash of the block, and includes the
     * following fields:
     *
     *  - hash of the previous block
     *  - hash of the data
     *  - difficulty
     *  - timestamp
     *
     * That means that any change on the above fields will produce a different
     * header, and thus a different hash.
     */
    getHeader(): TxBlockHeader {
        return this.blockHeader as TxBlockHeader;
    }

    serialize(): string {
        const header = this.getHeader() as TxBlockHeader;

        return JSON.stringify({
            timestamp: this.timestamp,
            difficulty: this.difficulty,
            gasLimit: header.gasLimit,
            // rewards: header.rewards,
            minerPubKey: header.minerPubKey,
            numTxs: this.transactions.size(),
            dsBlockNum: header.dsBlockNum,
            transactions: this.transactions.list
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

        const blocks = Object.keys(this.transactions.list);

        for (let index = 0; index < blocks.length; index++) {
            const key = Number(blocks[index]);
            const tx = this.transactions.list[key];

            if (!tx.isValid()) {
                return false;
            }
        }

        return validator(this.blockHash, this.difficulty);
    }
}

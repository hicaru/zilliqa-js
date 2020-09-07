import BN from 'bn.js';
import { sha256 } from 'hash.js';

import { BaseBlock, BaseBlockHeader } from './base-block';
import { CircularArray } from '../circular-array';
import { Transaction } from '../transaction';
import { validator } from '../../crypto';
import { TransactionStatuses } from '../../config';

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
        const buf = Buffer.from(JSON.stringify(this));
        const sha256HashSum = sha256()
            .update(buf)
            .digest('hex');

        return sha256HashSum;
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
        const txList = this.transactions.list;
        const txHashSet = Object.keys(txList);
        const transactions = txHashSet.map((hash) => ({
            BlockNum: this.getHeader().blockNum,
            Hash: hash
        }));

        return JSON.stringify({
            transactions,
            timestamp: this.timestamp,
            difficulty: this.difficulty,
            gasLimit: header.gasLimit,
            minerPubKey: header.minerPubKey,
            numTxs: this.transactions.size(),
            dsBlockNum: header.dsBlockNum
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

        const hashs = Object.keys(this.transactions.list);

        for (let index = 0; index < hashs.length; index++) {
            const hash = hashs[index];
            const tx = this.transactions.list[hash];

            if (!tx.isValid()) {
                this.transactions.rm(hash);
            }
        }

        return validator(this.blockHash, this.difficulty);
    }
}

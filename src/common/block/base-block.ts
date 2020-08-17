import BN from 'bn.js';
import { SHA256 } from 'crypto-js';

import { CoSignatures } from 'types';

export class BaseBlockHeader {
    protected version: BN;
    protected committeeHash: string;
    protected prevHash: string;
    protected blockNum: number;

    constructor(
        version: BN,
        committeeHash: string,
        prevHash: string,
        blockNum: number = 0
    ) {
        this.version = version;
        this.committeeHash = committeeHash;
        this.prevHash = prevHash;
        this.blockNum = blockNum;
    }

    public getBlockNum() {
        return this.blockNum;
    }

    public serialize() {
        return JSON.stringify(this);
    }

    public incrementBlockNumber() {
        this.blockNum++;

        return this.blockNum;
    }
}

export class BaseBlock {
    protected blockHash!: string;
    protected timestamp!: number;
    protected difficulty: number;
    protected cosigs!: CoSignatures;

    blockHeader!: BaseBlockHeader;

    constructor(
        timestamp: number,
        difficulty: number,
        cosigs: CoSignatures,
        blockHeader: BaseBlockHeader
    ) {
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.cosigs = cosigs;
        this.blockHeader = blockHeader;
    }

    protected _updateHash() {
        this.blockHash = this.calculateHash();
    }

    public incrementBlockNumber() {
        return this.blockHeader.incrementBlockNumber();
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
    getHeader(): BaseBlockHeader {
        return this.blockHeader;
    }

    /**
     * Checks if the block is a valid block.
     *
     * A block is valid if the following conditions are met:
     *
     *  - The hash stored in the block matches the calculated hash of the block.
     *  - The block complies with its difficulty requirements.
     *
     * @returns {boolean} Whether the block is valid or not.
     */
    isValid(): boolean {
        if (this.blockHash !== this.calculateHash()) {
            return false;
        }

        if (!this.blockHash.startsWith('0'.repeat(this.difficulty))) {
            return false;
        }

        return true;
    }

    /**
     * Calculates the hash of the block.
     *
     * @returns {string} The hash of the block.
     */
    calculateHash(): string {
        const serializeBlock = this.serialize();

        return SHA256(serializeBlock).toString();
    }

    serialize(): string {
        return JSON.stringify({
            ...this.getHeader(),
            timestamp: this.timestamp,
            difficulty: this.difficulty
        });
    }
}

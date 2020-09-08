import BN from 'bn.js';
import  { sha256 } from 'hash.js';
import { validator } from '../../crypto';

export class BaseBlockHeader {
    public version: BN;
    public prevHash: string;
    public blockNum: number;

    constructor(
        version: BN,
        prevHash: string,
        blockNum: number = 0
    ) {
        this.version = version;
        this.prevHash = prevHash;
        this.blockNum = blockNum;
    }

    public getBlockNum() {
        return this.blockNum;
    }

    public serialize() {
        return JSON.stringify(this);
    }
}

export class BaseBlock {
    public blockHash!: string;
    public timestamp!: number;
    public difficulty!: number;

    blockHeader!: BaseBlockHeader;

    constructor(
        timestamp: number,
        difficulty: number,
        blockHeader: BaseBlockHeader
    ) {
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.blockHeader = blockHeader;
    }

    public updateHash() {
        this.blockHash = this.calculateHash();
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

        return validator(this.blockHash, this.difficulty);
    }

    /**
     * Calculates the hash of the block.
     *
     * @returns {string} The hash of the block.
     */
    calculateHash(): string {
        const serializeBlock = this.getHeader().serialize();
        const buf = Buffer.from(serializeBlock);
        const sha256HashSum = sha256()
            .update(buf)
            .digest('hex');

        return sha256HashSum;
    }

    serialize(): string {
        return JSON.stringify({
            ...this.getHeader(),
            timestamp: this.timestamp,
            difficulty: this.difficulty
        });
    }
}

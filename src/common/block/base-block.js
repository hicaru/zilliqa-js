"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBlock = exports.BaseBlockHeader = void 0;
const crypto_js_1 = require("crypto-js");
class BaseBlockHeader {
    constructor(version, prevHash, blockNum = 0) {
        this.version = version;
        this.prevHash = prevHash;
        this.blockNum = blockNum;
    }
    getBlockNum() {
        return this.blockNum;
    }
    serialize() {
        return JSON.stringify(this);
    }
    incrementBlockNumber() {
        this.blockNum++;
        return this.blockNum;
    }
}
exports.BaseBlockHeader = BaseBlockHeader;
class BaseBlock {
    constructor(timestamp, difficulty, blockHeader) {
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.blockHeader = blockHeader;
    }
    _updateHash() {
        this.blockHash = this.calculateHash();
    }
    incrementBlockNumber() {
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
    getHeader() {
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
    isValid() {
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
    calculateHash() {
        const serializeBlock = this.serialize();
        return crypto_js_1.SHA256(serializeBlock).toString();
    }
    serialize() {
        return JSON.stringify(Object.assign(Object.assign({}, this.getHeader()), { timestamp: this.timestamp, difficulty: this.difficulty }));
    }
}
exports.BaseBlock = BaseBlock;
//# sourceMappingURL=base-block.js.map
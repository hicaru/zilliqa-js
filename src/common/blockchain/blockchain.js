"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChain = void 0;
const loglevel_1 = require("loglevel");
const common_1 = require("src/common");
const config_1 = require("src/config");
class BlockChain {
    constructor() {
        this.blocks = new common_1.CircularArray();
        this.difficulty = config_1.DIFFICULTY;
        if (this.blocks.size() === 0) {
            this.addBlock(config_1.GENESIS_DS_BLOCK);
        }
    }
    get getBlockCount() {
        return this.blocks.size();
    }
    get getLastBlock() {
        return this.blocks.getLast();
    }
    getBlock(blockNum) {
        const blockNumber = this
            .getLastBlock
            .getHeader()
            .getBlockNum();
        if (this.getBlockCount > 0 && blockNumber < blockNum) {
            loglevel_1.default.warn(`BlockNum too high ${blockNum} Dummy block used`);
        }
        else if (!this.blocks.has(blockNum)) {
            // Get from store...
        }
        else {
            return this.blocks.get(blockNum);
        }
        return null;
    }
    addBlock(block) {
        try {
            const blockNumber = block.getHeader().getBlockNum();
            this.blocks.add(block, blockNumber);
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
exports.BlockChain = BlockChain;
//# sourceMappingURL=blockchain.js.map
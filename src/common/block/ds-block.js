"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSBlock = exports.DSBlockHeader = void 0;
const base_block_1 = require("src/common/block/base-block");
class DSBlockHeader extends base_block_1.BaseBlockHeader {
    constructor(version, prevHash, dsDifficulty, difficulty, leaderPubKey, blockNum, epochNum, gasPrice) {
        super(version, prevHash, blockNum);
        this.dsDifficulty = dsDifficulty;
        this.difficulty = difficulty;
        this.leaderPubKey = leaderPubKey;
        this.epochNum = epochNum;
        this.gasPrice = gasPrice;
    }
}
exports.DSBlockHeader = DSBlockHeader;
class DSBlock extends base_block_1.BaseBlock {
    constructor(timestamp, difficulty, dsBlockHeader) {
        super(timestamp, difficulty, dsBlockHeader);
        this._updateHash();
    }
}
exports.DSBlock = DSBlock;
//# sourceMappingURL=ds-block.js.map
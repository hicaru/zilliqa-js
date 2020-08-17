"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxBlock = exports.MicroBlockHeader = void 0;
const base_block_1 = require("src/common/block/base-block");
class MicroBlockHeader extends base_block_1.BaseBlockHeader {
    constructor(version, committeeHash, prevHash, gasLimit, gasUsed, rewards, blockNum, hashset, numTxs, minerPubKey, dsBlockNum) {
        super(version, committeeHash, prevHash, blockNum);
        this.gasLimit = gasLimit;
        this.gasUsed = gasUsed;
        this.rewards = rewards;
        this.hashset = hashset;
        this.numTxs = numTxs;
        this.minerPubKey = minerPubKey;
        this.dsBlockNum = dsBlockNum;
    }
}
exports.MicroBlockHeader = MicroBlockHeader;
class TxBlock extends base_block_1.BaseBlock {
    constructor(timestamp, difficulty, cosigs, txBlockHeader, microBlockInfo) {
        super(timestamp, difficulty, cosigs, txBlockHeader);
        this.microBlockInfo = microBlockInfo;
    }
}
exports.TxBlock = TxBlock;
//# sourceMappingURL=tx-block.js.map
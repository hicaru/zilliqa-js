"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroBlock = exports.MicroBlockHeader = void 0;
const base_block_1 = require("src/common/block/base-block");
class MicroBlockHeader extends base_block_1.BaseBlockHeader {
    constructor(version, committeeHash, prevHash, shardId, gasLimit, rewards, epochNum, hashset, numTxs, minerPubKey, dsBlockNum) {
        super(version, committeeHash, prevHash);
        this.gasLimit = gasLimit;
        this.rewards = rewards;
        this.epochNum = epochNum;
        this.hashset = hashset;
        this.numTxs = numTxs;
        this.minerPubKey = minerPubKey;
        this.dsBlockNum = dsBlockNum;
        this.shardId = shardId;
    }
}
exports.MicroBlockHeader = MicroBlockHeader;
class MicroBlock extends base_block_1.BaseBlock {
    constructor(timestamp, difficulty, cosigs, microBlockHeader, hashes) {
        super(timestamp, difficulty, cosigs, microBlockHeader);
        this.hashes = hashes;
    }
}
exports.MicroBlock = MicroBlock;
//# sourceMappingURL=micro-block.js.map
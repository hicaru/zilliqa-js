"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBBlock = exports.FBBlockHeader = void 0;
const base_block_1 = require("src/common/block/base-block");
class FBBlockHeader extends base_block_1.BaseBlockHeader {
    constructor(version, committeeHash, prevHash, fallbackDSEpochNo, fallbackEpochNo, fallbackState, hashset, leaderConsensusId, leaderNetworkInfo, leaderPubKey, shardId) {
        super(version, committeeHash, prevHash);
        this.fallbackDSEpochNo = fallbackDSEpochNo;
        this.fallbackEpochNo = fallbackEpochNo;
        this.fallbackState = fallbackState;
        this.hashset = hashset;
        this.leaderConsensusId = leaderConsensusId;
        this.leaderNetworkInfo = leaderNetworkInfo;
        this.leaderPubKey = leaderPubKey;
        this.shardId = shardId;
    }
}
exports.FBBlockHeader = FBBlockHeader;
class FBBlock extends base_block_1.BaseBlock {
    constructor(timestamp, difficulty, cosigs, fallbackBlockHeader) {
        super(timestamp, difficulty, cosigs, fallbackBlockHeader);
    }
}
exports.FBBlock = FBBlock;
//# sourceMappingURL=fb-block.js.map
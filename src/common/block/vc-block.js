"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VcBlock = exports.VcBlockHeader = void 0;
const base_block_1 = require("src/common/block/base-block");
class VcBlockHeader extends base_block_1.BaseBlockHeader {
    constructor(version, committeeHash, prevHash, viewWChangeDSEpochNo, viewWChangeEpochNo, viewChangeState, andidateLeaderNetworkInfo, candidateLeaderPubKey, vcCounter, faultyLeaders) {
        super(version, committeeHash, prevHash);
        this.viewWChangeDSEpochNo = viewWChangeDSEpochNo;
        this.viewWChangeEpochNo = viewWChangeEpochNo;
        this.viewChangeState = viewChangeState;
        this.andidateLeaderNetworkInfo = andidateLeaderNetworkInfo;
        this.candidateLeaderPubKey = candidateLeaderPubKey;
        this.vcCounter = vcCounter;
        this.faultyLeaders = faultyLeaders;
    }
}
exports.VcBlockHeader = VcBlockHeader;
class VcBlock extends base_block_1.BaseBlock {
    constructor(timestamp, difficulty, cosigs, vcBlockHeader) {
        super(timestamp, difficulty, cosigs, vcBlockHeader);
    }
}
exports.VcBlock = VcBlock;
//# sourceMappingURL=vc-block.js.map
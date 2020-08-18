import BN from 'bn.js';

import { BaseBlock, BaseBlockHeader } from 'src/common/block/base-block';

export class VcBlockHeader extends BaseBlockHeader {
    viewWChangeDSEpochNo: number;
    viewWChangeEpochNo: number;
    viewChangeState: string;
    andidateLeaderNetworkInfo: string;
    candidateLeaderPubKey: string;
    vcCounter: number;
    faultyLeaders: string;

    constructor(
        version: BN,
        committeeHash: string,
        viewWChangeDSEpochNo: number,
        viewWChangeEpochNo: number,
        viewChangeState: string,
        andidateLeaderNetworkInfo: string,
        candidateLeaderPubKey: string,
        vcCounter: number,
        faultyLeaders: string
    ) {
        super(version, committeeHash);

        this.viewWChangeDSEpochNo = viewWChangeDSEpochNo;
        this.viewWChangeEpochNo = viewWChangeEpochNo;
        this.viewChangeState = viewChangeState;
        this.andidateLeaderNetworkInfo = andidateLeaderNetworkInfo;
        this.candidateLeaderPubKey = candidateLeaderPubKey;
        this.vcCounter = vcCounter;
        this.faultyLeaders = faultyLeaders;
    }
}

export class VcBlock extends BaseBlock {
    constructor(
        timestamp: number,
        difficulty: number,
        vcBlockHeader: VcBlockHeader
    ) {
        super(timestamp, difficulty, vcBlockHeader);
    }
}

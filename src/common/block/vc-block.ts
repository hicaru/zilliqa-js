import BN from 'bn.js';

import { BaseBlock, BaseBlockHeader } from 'src/common/block/base-block';
import { CoSignatures } from 'types';

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
        prevHash: string,
        viewWChangeDSEpochNo: number,
        viewWChangeEpochNo: number,
        viewChangeState: string,
        andidateLeaderNetworkInfo: string,
        candidateLeaderPubKey: string,
        vcCounter: number,
        faultyLeaders: string
    ) {
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

export class VcBlock extends BaseBlock {
    vcBlockHeader: VcBlockHeader;

    constructor(
        blockHash: string,
        timestamp: number,
        cosigs: CoSignatures,
        vcBlockHeader: VcBlockHeader
    ) {
        super(blockHash, timestamp, cosigs);

        this.vcBlockHeader = vcBlockHeader;
    }
}

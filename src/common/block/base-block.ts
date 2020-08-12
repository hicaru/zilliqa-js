import BN from 'bn.js';

import { CoSignatures } from 'types';

export class BaseBlockHeader {
    protected version: BN;
    protected committeeHash: string;
    protected prevHash: string;

    constructor(version: BN, committeeHash: string, prevHash: string) {
        this.version = version;
        this.committeeHash = committeeHash;
        this.prevHash = prevHash;
    }
}

export class BaseBlock {
    protected BlockHash: string;
    protected timestamp: number;
    protected cosigs: CoSignatures;

    constructor(BlockHash: string, timestamp: number, cosigs: CoSignatures) {
        this.BlockHash = BlockHash;
        this.timestamp = timestamp;
        this.cosigs = cosigs;
    }
}

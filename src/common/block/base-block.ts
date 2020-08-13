import BN from 'bn.js';

import { CoSignatures } from 'types';

export class BaseBlockHeader {
    protected version: BN;
    protected committeeHash: string;
    protected prevHash: string;
    protected blockNum: number;

    constructor(
        version: BN,
        committeeHash: string,
        prevHash: string,
        blockNum: number = 0
    ) {
        this.version = version;
        this.committeeHash = committeeHash;
        this.prevHash = prevHash;
        this.blockNum = blockNum;
    }

    public getBlockNum() {
        return this.blockNum;
    }
}

export class BaseBlock {
    protected blockHash!: string;
    protected timestamp!: number;
    protected cosigs!: CoSignatures;

    blockHeader!: BaseBlockHeader;

    constructor(
        blockHash: string,
        timestamp: number,
        cosigs: CoSignatures,
        blockHeader: BaseBlockHeader
    ) {
        this.blockHash = blockHash;
        this.timestamp = timestamp;
        this.cosigs = cosigs;
        this.blockHeader = blockHeader;
    }

    getHeader() {
        return this.blockHeader;
    }
}

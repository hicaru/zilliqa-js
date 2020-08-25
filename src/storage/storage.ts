import { CircularArray, DSBlock } from '../common';

export abstract class Storage {
    abstract getDSBlockNumber(blockNumber: number | string): void;
    abstract getTXBlockNumber(blockNumber: number | string): void;
    abstract getTX(hash: string): void;
    abstract getAccount(adress: string): void;

    abstract setNewDSBlock(block: DSBlock): void;
}

export class MemmoryStorage extends Storage {
    store = new CircularArray<string>();

    getDSBlockNumber() {}

    getTXBlockNumber() {}

    getTX(hash: string) {}

    getAccount(address: string) {}

    setNewDSBlock(block: DSBlock) {
        
    }
}

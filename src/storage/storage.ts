export abstract class Storage {
    abstract getDSBlockNumber(blockNumber: number | string): void;
    abstract getTXBlockNumber(blockNumber: number | string): void;
    abstract getTX(hash: string): void;

    abstract setNewDSBlock(): void;
    abstract setNewTXBlock(): void;
}

export class MemmoryStorage extends Storage {
}

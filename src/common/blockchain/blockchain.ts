import log from 'loglevel';
import { CircularArray } from 'src/common';
import { BaseBlock } from 'src/common/block';

export class BlockChain {
    blocks = new CircularArray<BaseBlock>();

    get getBlockCount() {
        return this.blocks.size();
    }

    get getLastBlock() {
        return this.blocks.getLast();
    }

    constructor() {}

    public getBlock(blockNum: number) {
        const blockNumber = this
            .getLastBlock
            .getHeader()
            .getBlockNum();

        if (this.getBlockCount > 0 && blockNumber < blockNum) {
            log.warn(`BlockNum too high ${blockNum} Dummy block used`);
        } else if (!this.blocks.has(blockNum)) {
            // Get from store...
        } else {
            return this.blocks.get(blockNum);
        }

        return null;
    }
}

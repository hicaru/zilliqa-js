import log from 'loglevel';
import { CircularArray } from 'src/common';
import { BaseBlock } from 'src/common/block';
import { GENESIS_DS_BLOCK, DIFFICULTY } from 'src/config';

export class BlockChain {
    blocks = new CircularArray<BaseBlock>();
    difficulty: number;

    get getBlockCount() {
        return this.blocks.size();
    }

    get getLastBlock() {
        return this.blocks.getLast();
    }

    constructor() {
        this.difficulty = DIFFICULTY;

        if (this.blocks.size() === 0) {
            this.addBlock(GENESIS_DS_BLOCK);
        }
    }

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

    addBlock(block: BaseBlock) {
        try {
            const blockNumber = block.getHeader().getBlockNum();

            this.blocks.add(block, blockNumber);

            return true;
        } catch (err) {
            return false;
        }
    }
}

import BN from 'bn.js';

import { CircularArray } from '../circular-array';
import { BaseBlock, DSBlock, DSBlockHeader } from '../block';
import { PowSolution } from '../../pow';
import {
    GENESIS_DS_BLOCK,
    DIFFICULTY,
    VERSION,
    DS_DIFFICULTY,
    MINER_PUBKEY,
    DEFAULT_GAS_PRICE
} from '../../config';

export class BlockChain {
    blocks = new CircularArray<BaseBlock>();
    pow = new PowSolution();
    difficulty: number;
    dsDifficulty: number;
    version: BN;

    get getBlockCount() {
        return this.blocks.size();
    }

    get getLastBlock() {
        return this.blocks.getLast();
    }

    constructor() {
        this.difficulty = DIFFICULTY;
        this.dsDifficulty = DS_DIFFICULTY;
        this.version = VERSION;

        if (this.blocks.size() === 0) {
            this.addBlock(GENESIS_DS_BLOCK);
        }
    }

    private _getLastBlock() {
        return this.blocks.getLast();
    }

    public getBlock(blockNum: number) {
        const blockNumber = this
            .getLastBlock
            .getHeader()
            .getBlockNum();

        if (this.getBlockCount > 0 && blockNumber < blockNum) {
            console.warn(`BlockNum too high ${blockNum} Dummy block used`);
        } else if (!this.blocks.has(blockNum)) {
            // Get from store...
        } else {
            return this.blocks.get(blockNum);
        }

        return null;
    }

    async addBlock(block: BaseBlock) {
        try {
            const minedBlock = await this.pow.mineDSBlock(block);

            this.blocks.add(minedBlock, minedBlock.getHeader().blockNum);
            
            // console.log();
            console.debug(minedBlock)

            const lastBlock = this._getLastBlock();
            const header = new DSBlockHeader(
                this.version,
                lastBlock.blockHash,
                this.dsDifficulty,
                this.difficulty,
                MINER_PUBKEY,
                lastBlock.getHeader().getBlockNum() + 1,
                lastBlock.getHeader().getBlockNum() + 1,
                DEFAULT_GAS_PRICE
            );
            const timestamp = new Date().valueOf();
            const newBlock = new DSBlock(timestamp, this.dsDifficulty, header);

            this.addBlock(newBlock);

            return true;
        } catch (err) {
            return false;
        }
    }


}

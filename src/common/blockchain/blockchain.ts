import BN from 'bn.js';
import chalk from 'chalk';

import { CircularArray } from '../circular-array';
import { BaseBlock, DSBlock, DSBlockHeader } from '../block';
import { PowSolution } from '../../pow';
import {
    GENESIS_TX_BLOCK,
    DIFFICULTY,
    VERSION,
    DS_DIFFICULTY,
    MINER_PUBKEY,
    GENESIS_BLOCK_NUMBER,
    DEFAULT_GAS_PRICE,
    GasLimits,
    ZERO_HASH
} from '../../config';
import { TxBlock, TxBlockHeader } from '../block/tx-block';

export class BlockChain {
    dsBlocks = new CircularArray<DSBlock>();
    txBlocks = new CircularArray<TxBlock>();
    pow = new PowSolution();
    difficulty: number;
    dsDifficulty: number;
    version: BN;

    get getBlockCount() {
        return this.dsBlocks.size();
    }

    get getLastBlock() {
        return this.dsBlocks.getLast();
    }

    constructor() {
        this.difficulty = DIFFICULTY;
        this.dsDifficulty = DS_DIFFICULTY;
        this.version = VERSION;

        if (this.dsBlocks.size() === 0) {
            this.addBlock(GENESIS_TX_BLOCK);
        }
    }

    private _getLastBlock() {
        return this.dsBlocks.getLast();
    }

    private async _createDSBlock() {
        const lastBlock = this._getLastBlock();
        const lastBlockHash = !lastBlock ? ZERO_HASH : lastBlock.blockHash;
        const lastBlockNumber = !lastBlock ? GENESIS_BLOCK_NUMBER : lastBlock.getHeader().getBlockNum();
        const header = new DSBlockHeader(
            this.version,
            lastBlockHash,
            this.dsDifficulty,
            this.difficulty,
            MINER_PUBKEY,
            lastBlockNumber + 1,
            DEFAULT_GAS_PRICE
        );
        const timestamp = new Date().valueOf();
        const newBlock = new DSBlock(timestamp, this.dsDifficulty, header);

        newBlock.txBlocks = this.txBlocks;

        const minedBlock = await this.pow.mineBlock<DSBlock>(newBlock);

        this.dsBlocks.add(minedBlock, minedBlock.getHeader().blockNum);
        // this.txBlocks.reset();
    }

    public getBlock(blockNum: number) {
        const lastBlock = this.getLastBlock;

        if (!lastBlock) {
            return null;
        }
        const blockNumber = lastBlock.getHeader().getBlockNum();

        if (this.getBlockCount > 0 && blockNumber < blockNum) {
            console.warn(`BlockNum too high ${blockNum} Dummy block used`);
        } else if (!this.dsBlocks.has(blockNum)) {
            // Get from store...
        } else {
            return this.dsBlocks.get(blockNum);
        }

        return null;
    }

    async addBlock(block: TxBlock) {
        try {
            const minedBlock = await this.pow.mineBlock<TxBlock>(block);

            this.txBlocks.add(minedBlock, minedBlock.getHeader().blockNum);

            if (this.txBlocks.size() >= 100) {
                await this._createDSBlock();
            }

            const lastBlock = this._getLastBlock();
            const lastBlockNumber = !lastBlock ? GENESIS_BLOCK_NUMBER : lastBlock.getHeader().getBlockNum();
            const newTxHeader = new TxBlockHeader(
                VERSION,
                new BN(GasLimits.TX),
                minedBlock.getHeader().blockNum + 1,
                minedBlock.blockHash,
                MINER_PUBKEY,
                lastBlockNumber
            );
            const newTxBlock = new TxBlock(
                new Date().valueOf(),
                DIFFICULTY,
                newTxHeader
            );

            this.addBlock(newTxBlock);
        } catch (err) {
            console.error(
                chalk.redBright('error'),
                chalk.red(err)
            );
        }
    }


}

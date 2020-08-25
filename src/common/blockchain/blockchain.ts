import BN from 'bn.js';
import chalk from 'chalk';

import { CircularArray } from '../circular-array';
import { DSBlock, DSBlockHeader } from '../block';
import { PowSolution } from '../../pow';
import { GasLimits } from '../../config';
import { TxBlock, TxBlockHeader } from '../block/tx-block';
import { Transaction } from '../transaction';

export class BlockChain {
    dsBlocks = new CircularArray<DSBlock>();
    txBlocks = new CircularArray<TxBlock>();
    pendingTxns = new CircularArray<Transaction>();

    pow = new PowSolution();
    genesisTxBlock: TxBlock;
    difficulty: number;
    dsDifficulty: number;
    genesisBlockNumber: number;
    chainId: BN;
    zeroHash: string;
    defaultMiner: string;
    defaultGasPrice: BN;
    version: BN;

    get getDSBlockCount() {
        return this.dsBlocks.size();
    }

    get getTXBlockCount() {
        return this.txBlocks.size();
    }

    get getLastDSBlock() {
        return this.dsBlocks.getLast();;
    }

    get getLastTXBlock() {
        return this.txBlocks.getLast();;
    }

    constructor(
        difficulty: number,
        dsDifficulty: number,
        version: BN,
        genesisTxBlock: TxBlock,
        genesisBlockNumber: number,
        zeroHash: string,
        defaultMiner: string,
        defaultGasPrice: BN,
        chainId: BN
    ) {
        this.difficulty = difficulty;
        this.dsDifficulty = dsDifficulty;
        this.version = version;
        this.zeroHash = zeroHash;
        this.genesisBlockNumber = genesisBlockNumber;
        this.defaultMiner = defaultMiner;
        this.defaultGasPrice = defaultGasPrice;
        this.genesisTxBlock = genesisTxBlock;
        this.chainId = chainId;

        if (this.dsBlocks.size() === 0) {
            this.addBlock(this.genesisTxBlock);
        }
    }

    private async _createDSBlock() {
        const lastBlock = this.getLastDSBlock;
        const lastBlockHash = !lastBlock ? this.zeroHash : lastBlock.blockHash;
        const lastBlockNumber = !lastBlock ? this.genesisBlockNumber : lastBlock.getHeader().getBlockNum();
        const header = new DSBlockHeader(
            this.version,
            lastBlockHash,
            this.dsDifficulty,
            this.difficulty,
            this.defaultMiner,
            lastBlockNumber + 1,
            this.defaultGasPrice
        );
        const timestamp = new Date().valueOf();
        const newBlock = new DSBlock(timestamp, this.dsDifficulty, header);

        newBlock.txBlocks = this.txBlocks;

        const minedBlock = await this.pow.mineBlock<DSBlock>(newBlock);

        this.dsBlocks.add(minedBlock, minedBlock.getHeader().blockNum);
        // this.txBlocks.reset();
    }

    public getDSBlock(blockNum: number) {
        const lastBlock = this.getLastDSBlock;

        if (!lastBlock) {
            return null;
        }

        const blockNumber = lastBlock.getHeader().getBlockNum();

        if (this.getDSBlockCount > 0 && blockNumber < blockNum) {
            console.warn(`BlockNum too high ${blockNum} Dummy block used`);
        } else if (!this.dsBlocks.has(blockNum)) {
            // Get from store...
        } else {
            return this.dsBlocks.get(blockNum);
        }

        return null;
    }

    public getTXBlock(blockNum: number) {
        const lastBlock = this.getLastTXBlock;

        if (!lastBlock) {
            return null;
        }

        const blockNumber = lastBlock.getHeader().getBlockNum();

        if (this.getTXBlockCount > 0 && blockNumber < blockNum) {
            console.warn(`BlockNum too high ${blockNum} Dummy block used`);
        } else if (!this.txBlocks.has(blockNum)) {
            // Get from store...
        } else {
            return this.txBlocks.get(blockNum);
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

            const lastBlock = this.getLastDSBlock;
            const lastBlockNumber = !lastBlock ? this.genesisBlockNumber : lastBlock.getHeader().getBlockNum();
            const newTxHeader = new TxBlockHeader(
                this.version,
                new BN(GasLimits.TX),
                minedBlock.getHeader().blockNum + 1,
                minedBlock.blockHash,
                this.defaultMiner,
                lastBlockNumber
            );
            const newTxBlock = new TxBlock(
                new Date().valueOf(),
                this.difficulty,
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

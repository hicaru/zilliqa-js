import BN from 'bn.js';
import chalk from 'chalk';

import { TxBlock, TxBlockHeader } from '../block/tx-block';
import { Storage } from '../../storage';
import { CircularArray } from '../circular-array';
import { PowSolution } from '../../pow';
import { GasLimits } from '../../config';
import { Transaction, DSBlock } from '..';
import { normalizedHex } from '../../utils';

export class TXBlockchain {
    private readonly _storage: Storage;
    private readonly _pow = new PowSolution();

    private readonly _difficulty: number;
    private readonly _defaultMiner: string;
    private readonly _version: BN;

    public readonly txBlocks = new CircularArray<TxBlock>();
    public readonly pendingTransactions = new CircularArray<Transaction>();

    public get getLastTXBlock() {
        return this.txBlocks.getLast();
    }

    constructor(
        difficulty: number,
        version: BN,
        defaultMiner: string,
        storage: Storage
    ) {
        this._storage = storage;
        this._difficulty = difficulty;
        this._version = version;
        this._defaultMiner = defaultMiner;
    }

    private async _mineTxBlock(txBlock: TxBlock) {
        txBlock.updateHash();

        const minedBlock = await this._pow.mineBlock<TxBlock>(txBlock);

        this.txBlocks.add(minedBlock, minedBlock.getHeader().blockNum);
        this._storage.setNewTXBlock(minedBlock);

        return minedBlock;
    }

    public init(genesisTxBlock: TxBlock) {
        return this._mineTxBlock(genesisTxBlock);
    }

    /**
     * Mining process.
     * @param dsBlock - Last DSBlock.
     * @param pendingTxns - All last added to queue txns.
     */
    public async createTXBlock(dsBlock: DSBlock) {
        try {
            const lastBlock = this.getLastTXBlock;

            if (!lastBlock) {
                throw new Error('Should be has got genesisTxBlock.');
            }

            const newTxHeader = new TxBlockHeader(
                this._version,
                new BN(GasLimits.TX),
                lastBlock.getHeader().blockNum + 1,
                lastBlock.blockHash,
                this._defaultMiner,
                dsBlock.getHeader().blockNum
            );
            const newTxBlock = new TxBlock(
                new Date().valueOf(),
                this._difficulty,
                newTxHeader
            );

            newTxBlock.addTransactions(this.pendingTransactions);

            await this._mineTxBlock(newTxBlock);
        } catch (err) {
            console.error(
                chalk.redBright('error'),
                chalk.red(err)
            );
        }
    }

    public getBlock(blockNum: number) {
        let foundTxBlock = this.txBlocks.get(blockNum);

        if (!foundTxBlock) {
            foundTxBlock = this._storage.getTXBlock(blockNum);
        }

        return foundTxBlock;
    }

    public addTransaction(transaction: Transaction) {
        const hash = normalizedHex(transaction.hash);

        this.pendingTransactions.add(transaction, hash);
    }

    public getTransaction(hash: string) {
        const parsed = normalizedHex(hash);
        let foundTx = this.pendingTransactions.get(parsed);

        if (!foundTx) {
            foundTx = this._storage.getTX(parsed);
        }

        return foundTx;
    }
}

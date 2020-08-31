import BN from 'bn.js';
import chalk from 'chalk';

import { TxBlock, TxBlockHeader } from '../block/tx-block';
import { Storage } from '../../storage';
import { CircularArray } from '../circular-array';
import { PowSolution } from '../../pow';
import { GasLimits } from '../../config';
import { Transaction, DSBlock } from '..';

export class TXBlockchain {
    private _storage: Storage;
    private _pow: PowSolution;

    private _difficulty: number;
    private _defaultMiner: string;
    private _version: BN;

    public txBlocks = new CircularArray<TxBlock>();

    public get getLastTXBlock() {
        return this.txBlocks.getLast();
    }

    constructor(
        difficulty: number,
        version: BN,
        defaultMiner: string,
        storage: Storage,
        pow: PowSolution
    ) {
        this._storage = storage;
        this._difficulty = difficulty;
        this._version = version;
        this._defaultMiner = defaultMiner;
        this._pow = pow;
    }

    /**
     * Mining process.
     * @param dsBlock - Last DSBlock.
     * @param pendingTxns - All last added to queue txns.
     */
    public async createTXBlock(dsBlock: DSBlock, pendingTxns: CircularArray<Transaction>) {
        try {
            const lastBlock = this.getLastTXBlock;
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

            newTxBlock.updateHash();

            const minedBlock = await this._pow.mineBlock<TxBlock>(newTxBlock);

            this.txBlocks.add(minedBlock, minedBlock.getHeader().blockNum);
            this._storage.setNewTXBlock(minedBlock);
        } catch (err) {
            console.error(
                chalk.redBright('error'),
                chalk.red(err)
            );
        }
    }
}

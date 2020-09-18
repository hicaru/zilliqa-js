import BN from 'bn.js';
import _ from 'lodash';

import { DSBlock, DSBlockHeader } from '../block';
import { TxBlock } from '../block/tx-block';
import { Storage } from '../../storage';
import { CircularArray } from '../circular-array';
import { PowSolution } from '../../pow';

export class DSBlockchain {
    private _storage: Storage;
    private _pow = new PowSolution();

    private _difficulty: number;
    private _dsDifficulty: number;
    private _genesisBlockNumber: number;
    private _zeroHash: string;
    private _defaultMiner: string;
    private _defaultGasPrice: BN;
    private _version: BN;

    public dsBlocks = new CircularArray<DSBlock>();
    public numberOfTransactions = 0;

    public lastBlock: DSBlock;

    constructor(
        difficulty: number,
        dsDifficulty: number,
        version: BN,
        genesisBlockNumber: number,
        zeroHash: string,
        defaultMiner: string,
        defaultGasPrice: BN,
        storage: Storage
    ) {
        this._storage = storage;
        this._difficulty = difficulty;
        this._dsDifficulty = dsDifficulty;
        this._version = version;
        this._zeroHash = zeroHash;
        this._genesisBlockNumber = genesisBlockNumber;
        this._defaultMiner = defaultMiner;
        this._defaultGasPrice = defaultGasPrice;

        const header = new DSBlockHeader(
            this._version,
            this._zeroHash,
            this._dsDifficulty,
            this._difficulty,
            this._defaultMiner,
            this._genesisBlockNumber,
            this._defaultGasPrice
        );
        const timestamp = new Date().valueOf();
        const newBlock = new DSBlock(timestamp, this._dsDifficulty, header);

        this.lastBlock = _.cloneDeep(newBlock);
    }

    /**
     * Create DSBlock instance, mine block, validate txBlocks.
     * @param txBlocks - Some items of txBlocks.
     */
    public async createDSBlock(txBlocks: CircularArray<TxBlock>) {
        const lastBlock = this.lastBlock;
        const lastBlockHash = !lastBlock ? this._zeroHash : lastBlock.blockHash;
        const lastBlockNumber = !lastBlock ? this._genesisBlockNumber - 1 : lastBlock.getHeader().getBlockNum();
        const header = new DSBlockHeader(
            this._version,
            lastBlockHash,
            this._dsDifficulty,
            this._difficulty,
            this._defaultMiner,
            lastBlockNumber + 1,
            this._defaultGasPrice
        );
        const timestamp = new Date().valueOf();
        const newBlock = new DSBlock(timestamp, this._dsDifficulty, header);

        newBlock.txBlocks = txBlocks;

        newBlock.updateHash();

        const minedBlock = await this._pow.mineBlock<DSBlock>(newBlock);

        this.dsBlocks.add(minedBlock, minedBlock.getHeader().blockNum);
        this.lastBlock = _.cloneDeep(minedBlock);;
        this._storage.setNewDSBlock(minedBlock);
    }

    public getBlock(blockNum: number) {
        if (this.lastBlock.getHeader().blockNum === blockNum) {
            return this.lastBlock;
        }

        let foundDsBlock = this.dsBlocks.get(blockNum);

        if (!foundDsBlock) {
            foundDsBlock = this._storage.getDSBlock(blockNum);
        }

        return foundDsBlock;
    }
}

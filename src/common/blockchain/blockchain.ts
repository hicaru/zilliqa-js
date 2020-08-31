import BN from 'bn.js';
import chalk from 'chalk';

import { CircularArray } from '../circular-array';
import { DSBlock, DSBlockHeader } from '../block';
import { PowSolution } from '../../pow';
import { GasLimits } from '../../config';
import { TxBlock, TxBlockHeader } from '../block/tx-block';
import { Transaction } from '../transaction';
import { Storage } from '../../storage';
import { WalletCtrl } from '../wallet';

export class BlockChain {
    private _storage: Storage;
    private _wallet: WalletCtrl;

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
    amountTxBlocksPearDSBlock: number;
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
        return this.dsBlocks.getLast();
    }

    get getLastTXBlock() {
        return this.txBlocks.getLast();
    }

    constructor(
        amountTxBlocksPearDSBlock: number,
        difficulty: number,
        dsDifficulty: number,
        version: BN,
        genesisTxBlock: TxBlock,
        genesisBlockNumber: number,
        zeroHash: string,
        defaultMiner: string,
        defaultGasPrice: BN,
        chainId: BN,
        storage: Storage,
        mnemonic: string
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
        this.amountTxBlocksPearDSBlock = amountTxBlocksPearDSBlock;
        
        this._storage = storage;
        this._wallet = new WalletCtrl(mnemonic);

        if (this.txBlocks.size() === 0) {
            this.addBlock(this.genesisTxBlock);
        }

        const genesisAccounts = this._wallet.initAccounts();

        for (let index = 0; index < genesisAccounts.length; index++) {
            const account = genesisAccounts[index];

            this._storage.setAccount(account);
        }
    }

    private async _createDSBlock() {
        const lastBlock = this.getLastDSBlock;
        const lastBlockHash = !lastBlock ? this.zeroHash : lastBlock.blockHash;
        const lastBlockNumber = !lastBlock ? this.genesisBlockNumber - 1 : lastBlock.getHeader().getBlockNum();
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

        newBlock.updateHash();

        const minedBlock = await this.pow.mineBlock<DSBlock>(newBlock);

        this.dsBlocks.add(minedBlock, minedBlock.getHeader().blockNum);
        this._storage.setNewDSBlock(minedBlock);
        this.txBlocks.reset();
    }

    public getDSBlock(blockNum: number) {
        let foundDsBlock = this.dsBlocks.get(blockNum);

        if (!foundDsBlock) {
            foundDsBlock = this._storage.getDSBlock(blockNum);
        }

        return foundDsBlock;
    }

    public getTXBlock(blockNum: number) {
        let foundTxBlock = this.txBlocks.get(blockNum);

        if (!foundTxBlock) {
            foundTxBlock = this._storage.getTXBlock(blockNum);
        }

        return foundTxBlock;
    }

    public getAccount(address: string) {
        return this._storage.getAccount(address);
    }

    async addBlock(block: TxBlock) {
        try {
            const minedBlock = await this.pow.mineBlock<TxBlock>(block);

            this.txBlocks.add(minedBlock, minedBlock.getHeader().blockNum);
            this._storage.setNewTXBlock(minedBlock);
            this.pendingTxns.reset();

            if (this.txBlocks.size() >= this.amountTxBlocksPearDSBlock || this.dsBlocks.size() === 0) {
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
            newTxBlock.transactions.addList(this.pendingTxns.list as any);
            newTxBlock.updateHash();

            this.addBlock(newTxBlock);
        } catch (err) {
            console.error(
                chalk.redBright('error'),
                chalk.red(err)
            );
        }
    }

    addTransaction(transaction: Transaction) {
        this.pendingTxns.add(transaction, transaction.hash);
    }

    getTransaction(hash: string) {
        const parsed = hash.toLowerCase().replace('0x', '');
        let foundTx = this.pendingTxns.get(parsed);

        if (!foundTx) {
            foundTx = this._storage.getTX(parsed);
        }

        return foundTx;
    }
}

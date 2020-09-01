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
import { DSBlockchain } from './ds-blockchain';
import { TXBlockchain } from './tx-blockchain';

export class BlockChain {
    private readonly _storage: Storage;
    private readonly _wallet: WalletCtrl;

    readonly dsBlockchain: DSBlockchain;
    readonly txBlockchain: TXBlockchain;

    private _isRunniong = false;

    readonly genesisTxBlock: TxBlock;
    readonly difficulty: number;
    readonly dsDifficulty: number;
    readonly genesisBlockNumber: number;
    readonly chainId: BN;
    readonly zeroHash: string;
    readonly amountTxBlocksPearDSBlock: number;
    readonly defaultMiner: string;
    readonly defaultGasPrice: BN;
    readonly version: BN;

    public get numTxBlocks() {
        const lastBlock = this.txBlockchain.getLastTXBlock;

        return lastBlock?.getHeader().blockNum;
    }

    public get numDSBlocks() {
        const lastBlock = this.dsBlockchain.getLastDSBlock;

        return lastBlock?.getHeader().blockNum;
    }

    public get getNumTransactions() {
        return 0;
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
        this.dsBlockchain = new DSBlockchain(
            difficulty,
            dsDifficulty,
            version,
            genesisBlockNumber,
            zeroHash,
            defaultMiner,
            defaultGasPrice,
            this._storage
        );
        this.txBlockchain = new TXBlockchain(
            difficulty,
            version,
            defaultMiner,
            this._storage
        );

        const genesisAccounts = this._wallet.initAccounts();

        for (let index = 0; index < genesisAccounts.length; index++) {
            const account = genesisAccounts[index];

            this._storage.setAccount(account);
        }
    }

    public async start() {
        this._isRunniong = true;

        await this.txBlockchain.init(this.genesisTxBlock);
        await this.dsBlockchain.createDSBlock(this.txBlockchain.txBlocks);

        // while (this._isRunniong) {

        // }
    }

    public stop() {
        this._isRunniong = false;
    }

    public getAccount(address: string) {
        return this._storage.getAccount(address);
    }

    public addTransaction(transaction: Transaction) {
        // this.pendingTxns.add(transaction, transaction.hash);
    }

    public getTransaction(hash: string) {
        // const parsed = hash.toLowerCase().replace('0x', '');
        // let foundTx = this.pendingTxns.get(parsed);

        // if (!foundTx) {
        //     foundTx = this._storage.getTX(parsed);
        // }

        // return foundTx;
    }
}

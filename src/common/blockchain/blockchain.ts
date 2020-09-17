import BN from 'bn.js';
import chalk from 'chalk';

import { TxBlock } from '../block/tx-block';
import { Storage } from '../../storage';
import { WalletCtrl } from '../wallet';
import { DSBlockchain } from './ds-blockchain';
import { TXBlockchain } from './tx-blockchain';
import { ChainEvent } from './emiter';

export class BlockChain {
    private readonly _wallet: WalletCtrl;
    private readonly _storage: Storage;

    readonly dsBlockchain: DSBlockchain;
    readonly txBlockchain: TXBlockchain;
    readonly emitter: ChainEvent;

    private _isRunniong = false;

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

    public numTxnsDSEpoch = 0;

    public get numTxBlocks() {
        const lastBlock = this.txBlockchain.getLastTXBlock;

        return lastBlock?.getHeader().blockNum;
    }

    public get numDSBlocks() {
        const lastBlock = this.dsBlockchain.getLastDSBlock;

        return lastBlock?.getHeader().blockNum;
    }

    public get getNumTransactions() {
        return this._storage.getTxnsLength;
    }

    public get accounts() {
        return this._wallet.keys;
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
        this.emitter = new ChainEvent();
    }

    public async start() {
        console.log(
            chalk.yellowBright('mnemonic:'),
            chalk.green(this._wallet.mnemonic)
        );
        console.log(
            chalk.yellowBright('staring blocks mining...')
        );

        const genesisAccounts = this._wallet.initAccounts();

        for (let index = 0; index < genesisAccounts.length; index++) {
            const account = genesisAccounts[index];

            this._storage.setAccount(account);
        }

        this._isRunniong = true;

        await this.txBlockchain.init(this.genesisTxBlock);
        await this.dsBlockchain.createDSBlock(this.txBlockchain.txBlocks);

        while (this._isRunniong) {
            try {
                if (this.txBlockchain.txBlocks.size() >= this.amountTxBlocksPearDSBlock) {
                    await this.dsBlockchain.createDSBlock(this.txBlockchain.txBlocks);
    
                    this.numTxnsDSEpoch = this.txBlockchain.txBlocks.size();

                    this.txBlockchain.txBlocks.clear();
                    this.dsBlockchain.dsBlocks.clear();
                    this.dsBlockchain.numberOfTransactions = 0;
                    this.emitter.emit(this.emitter.types.dsBlock);
                }
    
                if (!this.dsBlockchain.getLastDSBlock) {
                    continue;
                }

                await this.txBlockchain.createTXBlock(this.dsBlockchain.getLastDSBlock);
    
                this.dsBlockchain.numberOfTransactions += this.txBlockchain.numberOfTransactions;
                this.emitter.emit(this.emitter.types.txBlock);
            } catch (err) {
                console.log(chalk.redBright(err));
                this.emitter.emit(this.emitter.types.error);
                this.stop();
                break;
            }

            if (!this._isRunniong) {
                break;
            }
        }
    }

    public stop() {
        this._isRunniong = false;
    }

    public restart() {
        this.stop();

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this.txBlockchain.txBlocks.reset();
                    this.dsBlockchain.dsBlocks.reset();
                    this.start();

                    return resolve(true);
                } catch (err) {
                    return reject(err);
                }
            }, 1000);
        });
    }

    public getAccount(address: string) {
        return this._storage.getAccount(address);
    }
}

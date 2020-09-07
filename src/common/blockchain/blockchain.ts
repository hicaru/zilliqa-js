import BN from 'bn.js';
import chalk from 'chalk';

import { CircularArray } from '../circular-array';
import { TxBlock } from '../block/tx-block';
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
        return this._storage.getTxnsLength;
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
        console.log(
            chalk.yellowBright('mnemonic:'),
            chalk.green(this._wallet.mnemonic)
        );
        console.log(
            chalk.yellowBright('staring blocks mining...')
        );

        this._isRunniong = true;

        await this.txBlockchain.init(this.genesisTxBlock);
        await this.dsBlockchain.createDSBlock(this.txBlockchain.txBlocks);

        while (this._isRunniong) {
            try {
                if (this.txBlockchain.txBlocks.size() >= this.amountTxBlocksPearDSBlock) {
                    await this.dsBlockchain.createDSBlock(this.txBlockchain.txBlocks);
    
                    this.txBlockchain.txBlocks.clear();
                    this.dsBlockchain.numberOfTransactions = 0;
                }
    
                if (!this.dsBlockchain.getLastDSBlock) {
                    continue;
                }
    
                await this.txBlockchain.createTXBlock(this.dsBlockchain.getLastDSBlock);
    
                this.dsBlockchain.numberOfTransactions += this.txBlockchain.numberOfTransactions;
            } catch (err) {
                console.log(chalk.redBright(err));
                this.stop();
                break;
            }
        }
    }

    public stop() {
        this._isRunniong = false;
    }

    public getAccount(address: string) {
        return this._storage.getAccount(address);
    }
}

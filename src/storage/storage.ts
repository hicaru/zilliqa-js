import BN from 'bn.js';
import rimraf from 'rimraf';
import { LocalStorage } from 'node-localstorage';
import {
    DSBlock,
    TxBlock,
    Transaction,
    Account,
    TxBlockHeader
} from '../common';
import { HOME_DIR, TransactionStatuses } from '../config';
import { normalizedHex } from '../utils';

export abstract class Storage {
    abstract get getTxnsLength(): number;

    abstract getDSBlock(blockNumber: number): DSBlock | null;
    abstract getTXBlock(blockNumber: number): TxBlock | null;
    abstract getTX(hash: string): Transaction | null;
    abstract getAccount(adress: string): Account;

    abstract setNewDSBlock(block: DSBlock): void;
    abstract setNewTXBlock(block: TxBlock): void;
    abstract setAccount(account: Account): void;

    abstract resetDir(): void
}

export class MemmoryStorage extends Storage {
    private readonly _txns: LocalStorage;
    private readonly _txBlocks: LocalStorage;
    private readonly _dsBlocks: LocalStorage;
    private readonly _accounts: LocalStorage;

    get getTxnsLength() {
        return this._txns.length;
    }

    constructor() {
        super();

        this.resetDir()

        this._txns = new LocalStorage(`${HOME_DIR}/txns`);
        this._txBlocks = new LocalStorage(`${HOME_DIR}/tx-blocks`);
        this._dsBlocks = new LocalStorage(`${HOME_DIR}/ds-blocks`);
        this._accounts = new LocalStorage(`${HOME_DIR}/accounts`);
    }

    resetDir() {
        rimraf.sync(HOME_DIR);
    }

    getDSBlock(blockNumber: number) {
        const foundDSblock = this._dsBlocks.getItem(String(blockNumber));

        if (!foundDSblock) {
            return null;
        }

        return DSBlock.deserialize(foundDSblock);
    }

    getTXBlock(blockNumber: number) {
        const foundTXBlock = this._txBlocks.getItem(String(blockNumber));

        if (!foundTXBlock) {
            return null;
        }

        const txBlock = JSON.parse(foundTXBlock);
        const header = new TxBlockHeader(
            new BN(txBlock.version),
            new BN(txBlock.gasLimit),
            txBlock.blockNum,
            txBlock.prevHash,
            txBlock.minerPubKey,
            txBlock.dsBlockNum
        );
        const block = new TxBlock(
            txBlock.timestamp,
            txBlock.difficulty,
            header
        );

        block.blockHash = txBlock.blockHash;
        block.transactions = txBlock.hashPool;

        return block;
    }

    getTX(hash: string) {
        const foundTX = this._txns.getItem(hash);

        if (!foundTX) {
            return null;
        }

        return Transaction.deserialize(foundTX, hash);
    }

    getAccount(address: string) {
        const account = this._accounts.getItem(normalizedHex(address));

        if (!account) {
            return new Account(address);
        }

        const parsed = JSON.parse(account);
        const foundAccount = new Account(
            address,
            parsed.nonce,
            parsed.balance,
            parsed.pubKey
        );

        return foundAccount;
    }

    setNewDSBlock(block: DSBlock) {
        const blockNumber = block.getHeader().blockNum;

        this._dsBlocks.setItem(String(blockNumber), block.serialize());
    }

    setNewTXBlock(block: TxBlock) {
        const blocNumber = block.getHeader().blockNum;
        const listOfTxns = block.transactions.list;
        const hashSet = Object.keys(listOfTxns);

        for (let index = 0; index < hashSet.length; index++) {
            const hash = hashSet[index];
            const tx = listOfTxns[hash];
            const amount = new BN(tx.amount);
            const sender = this.getAccount(tx.account.address);
            const toAddress = normalizedHex(tx.toAddr);
            const to = this.getAccount(toAddress);

            if (!tx.status) {
                sender.reduceBalance(amount);
                sender.increaseNonce();
                to.increaseBalance(amount);
                tx.asignBlock(blocNumber);
                tx.receipt = {
                    success: true,
                    cumulative_gas: '1',
                    epoch_num: String(blocNumber)
                }
                tx.statusUpdate(TransactionStatuses.TransactionIsNotPending);

                this._txns.setItem(tx.hash, tx.serialize());

                this.setAccount(to);
                this.setAccount(sender);   
            }
        }

        this._txBlocks.setItem(String(blocNumber), block.serialize());
    }

    setAccount(account: Account) {
        if (!account || !(account instanceof Account) || !account.address) {
            throw new Error('Account is required');
        }

        const address = normalizedHex(account.address);

        this._accounts.setItem(address, account.serialize());
    }
}

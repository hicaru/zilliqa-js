import BN from 'bn.js';
import fs from 'fs';
import { LocalStorage } from 'node-localstorage';
import {
    CircularArray,
    DSBlock,
    TxBlock,
    Transaction,
    Account,
    TxBlockHeader
} from '../common';
import { HOME_DIR } from '../config';
import { normalizedAddress } from '../utils';

export abstract class Storage {
    abstract getDSBlock(blockNumber: number): DSBlock | null;
    abstract getTXBlock(blockNumber: number): TxBlock | null;
    abstract getTX(hash: string): Transaction | null;
    abstract getAccount(adress: string): Account | null;

    abstract setNewDSBlock(block: DSBlock): void;
    abstract setNewTXBlock(block: TxBlock): void;
    abstract setAccount(account: Account): void;

    constructor() {}
}

export class MemmoryStorage extends Storage {
    private _txns: LocalStorage;
    private _txBlocks: LocalStorage;
    private _dsBlocks: LocalStorage;
    private _accounts: LocalStorage;

    constructor() {
        super();

        fs.rmdirSync(HOME_DIR, { recursive: true });

        this._txns = new LocalStorage(`${HOME_DIR}/txns`);
        this._txBlocks = new LocalStorage(`${HOME_DIR}/tx-blocks`);
        this._dsBlocks = new LocalStorage(`${HOME_DIR}/ds-blocks`);
        this._accounts = new LocalStorage(`${HOME_DIR}/accounts`);
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
            new BN(txBlock.blockHeader.version),
            new BN(Number(`0x${txBlock.blockHeader.gasLimit}`)),
            txBlock.blockHeader.blockNum,
            txBlock.blockHeader.prevHash,
            txBlock.blockHeader.minerPubKey,
            txBlock.blockHeader.dsBlockNum
        );
        const block = new TxBlock(
            txBlock.timestamp,
            txBlock.difficulty,
            header
        );

        block.transactions.addList(txBlock.transactions.items);

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
        const account = this._accounts.getItem(normalizedAddress(address));

        if (!account) {
            return null;
        }

        const parsed = JSON.parse(account);
        const foundAccount = new Account(
            parsed.pubKey,
            parsed.nonce,
            parsed.balance
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
            const sender = tx.account;
            const toAddress = normalizedAddress(tx.toAddr);
            const accountTo = this._accounts.getItem(toAddress);
            let to: Account;

            if (accountTo) {
                const parsed = JSON.parse(accountTo);
                const balance = new BN(parsed.balance);

                to = new Account(toAddress, parsed.nonce, balance);
            } else {
                to = new Account(toAddress);
            }

            to.increaseBalance(amount);
            sender.reduceBalance(amount);
            tx.asignBlock(blocNumber);

            this._txns.setItem(tx.hash, tx.serialize());

            this.setAccount(to);
            this.setAccount(sender);
        }

        this._txBlocks.setItem(String(blocNumber), block.serialize());
    }

    setAccount(account: Account) {
        const address = normalizedAddress(account.address);

        this._accounts.setItem(account.serialize(), address);
    }
}

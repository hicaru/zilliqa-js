import { CircularArray, DSBlock, TxBlock, Transaction, Account, DSBlockHeader, TxBlockHeader } from '../common';
import BN from 'bn.js';

export abstract class Storage {
    abstract getDSBlock(blockNumber: number): DSBlock | null;
    abstract getTXBlock(blockNumber: number): TxBlock | null;
    abstract getTX(hash: string): Transaction | null;
    abstract getAccount(adress: string): Account | null;

    abstract setNewDSBlock(block: DSBlock): void;
    abstract setAccount(account: Account): void;

    constructor() {}
}

export class MemmoryStorage extends Storage {
    txns = new CircularArray<string>();
    txBlocks = new CircularArray<number>();
    dsBlocks = new CircularArray<string>();
    accounts = new CircularArray<string>();

    getDSBlock(blockNumber: number) {
        const block = this.dsBlocks.get(blockNumber);

        if (!block) {
            return null;
        }

        return DSBlock.deserialize(block);
    }

    getTXBlock(blockNumber: number) {
        const dsBlockNumber = Number(this.txBlocks.get(blockNumber));
        
        if (!dsBlockNumber) {
            return null;
        }

        const dsBlock = this.getDSBlock(dsBlockNumber);

        if (!dsBlock) {
            return null
        }

        const txBlock = dsBlock.txBlocks.get(blockNumber) as any;

        if (!txBlock) {
            return null;
        }

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
        const txBlockNumber = this.txns.get(hash);

        if (!txBlockNumber) {
            return null;
        }

        const txBlock = this.getTXBlock(Number(txBlockNumber));
        const tx = txBlock?.transactions.get(hash);

        if (!tx) {
            return null;
        }

        return tx;
    }

    getAccount(address: string) {
        const normalizedAddress = address.toLowerCase().replace('0x', '');
        const account = this.accounts.get(normalizedAddress);

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
        const dsBlock = JSON.stringify(block);
        const txBlocks = block.txBlocks.list;
        const txBlocksKeys = Object.keys(block.txBlocks.list);

        for (let index = 0; index < txBlocksKeys.length; index++) {
            const key = txBlocksKeys[index];
            const txblock =  txBlocks[key];

            this.txBlocks.add(block.getHeader().blockNum, key);

            const txns = txblock.transactions.list;
            const txnKeys = Object.keys(txns);

            for (let index = 0; index < txnKeys.length; index++) {
                const txKey = txnKeys[index];
                const tx = txns[txKey];

                this.txns.add(tx.serialize(), tx.hash);
            }
        }

        this.dsBlocks.add(dsBlock, block.getHeader().blockNum);
    }

    setAccount(account: Account) {
        this.accounts.add(account.serialize(), account.address);
    }
}

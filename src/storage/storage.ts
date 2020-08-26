import { CircularArray, DSBlock, TxBlock, Transaction, Account } from '../common';

export abstract class Storage {
    abstract getDSBlock(blockNumber: number): void;
    abstract getTXBlock(blockNumber: number): void;
    abstract getTX(hash: string): void;
    abstract getAccount(adress: string): void;

    abstract setNewDSBlock(block: DSBlock): void;
}

export class MemmoryStorage extends Storage {
    txns = new CircularArray<string>();
    txBlocks = new CircularArray<number>();
    dsBlocks = new CircularArray<string>();
    accounts = new CircularArray<string>();

    getDSBlock(blockNumber: number): DSBlock | null {
        const block = this.dsBlocks.get(blockNumber);

        if (!block) {
            return null;
        }

        return JSON.parse(block);
    }

    getTXBlock(blockNumber: number): TxBlock | null {
        const dsBlockNumber = Number(this.txBlocks.get(blockNumber));
        
        if (!dsBlockNumber) {
            return null;
        }

        const dsBlock = this.getDSBlock(dsBlockNumber);

        if (!dsBlock) {
            return null
        }

        const txBlcok = dsBlock.txBlocks.get(blockNumber);

        if (txBlcok) {
            return null;
        }

        return txBlcok;
    }

    getTX(hash: string): Transaction | null {
        const txBlockNumber = Number(this.txns.get(hash));

        if (!txBlockNumber) {
            return null;
        }

        const txBlock = this.getTXBlock(txBlockNumber);
        const tx = txBlock?.transactions.get(hash);

        if (!tx) {
            return null;
        }

        return tx;
    }

    getAccount(address: string): Account | null {
        const account = this.accounts.get(address);

        if (!account) {
            return null;
        }

        return JSON.parse(account) as Account;
    }

    setNewDSBlock(block: DSBlock) {
        const txBlocks = block.txBlocks.list;
    }
}

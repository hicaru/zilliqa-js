import { CircularArray, DSBlock, TxBlock, Transaction, Account } from '../common';

export abstract class Storage {
    abstract getDSBlock(blockNumber: number): DSBlock | null;
    abstract getTXBlock(blockNumber: number): TxBlock | null;
    abstract getTX(hash: string): Transaction | null;
    abstract getAccount(adress: string): Account | null;

    abstract setNewDSBlock(block: DSBlock): void;
}

export class MemmoryStorage extends Storage {
    txns = new CircularArray<number>();
    txBlocks = new CircularArray<number>();
    dsBlocks = new CircularArray<string>();
    accounts = new CircularArray<string>();

    getDSBlock(blockNumber: number) {
        const block = this.dsBlocks.get(blockNumber);

        if (!block) {
            return null;
        }

        return JSON.parse(block);
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

        const txBlcok = dsBlock.txBlocks.get(blockNumber);

        if (txBlcok) {
            return null;
        }

        return txBlcok;
    }

    getTX(hash: string) {
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

    getAccount(address: string) {
        const account = this.accounts.get(address);

        if (!account) {
            return null;
        }

        return JSON.parse(account) as Account;
    }

    setNewDSBlock(block: DSBlock) {
        const dsBlock = block.serialize();
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

                this.txns.add(txblock.getHeader().blockNum, tx.hash);
            }
        }

        this.dsBlocks.add(dsBlock, block.getHeader().blockNum);
    }
}

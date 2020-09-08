import BN from 'bn.js';
import { BaseBlock, BaseBlockHeader } from './base-block';
import { TxBlock } from './tx-block';
import { validator } from '../../crypto';
import { CircularArray } from '../circular-array';

export class DSBlockHeader extends BaseBlockHeader {
    dsDifficulty: number;
    difficulty: number;
    leaderPubKey: string;
    gasPrice: BN;

    constructor(
        version: BN,
        prevHash: string,
        dsDifficulty: number,
        difficulty: number,
        leaderPubKey: string,
        blockNum: number,
        gasPrice: BN
    ) {
        super(version, prevHash, blockNum);

        this.dsDifficulty = dsDifficulty;
        this.difficulty = difficulty;
        this.leaderPubKey = leaderPubKey;
        this.gasPrice = gasPrice;
    }
}

export class DSBlock extends BaseBlock {
    public txBlocks = new CircularArray<TxBlock>();
    blockHeader!: DSBlockHeader;

    static deserialize(json: string) {
        const dsBlock = JSON.parse(json);
        const header = new DSBlockHeader(
            new BN(dsBlock.version),
            dsBlock.prevHash,
            dsBlock.blockNum,
            dsBlock.dsDifficulty,
            dsBlock.difficulty,
            dsBlock.leaderPubKey,
            new BN(dsBlock.gasPrice)
        );

        const ds = new DSBlock(
            dsBlock.timestamp,
            dsBlock.dsDifficulty,
            header
        );

        ds.txBlocks = dsBlock.txBlocks;
        ds.blockHash = dsBlock.blockHash;

        return ds;
    }

    constructor(
        timestamp: number,
        difficulty: number,
        dsBlockHeader: DSBlockHeader
    ) {
        super(timestamp, difficulty, dsBlockHeader);
    }

    serialize(): string {
        const header = this.getHeader() as DSBlockHeader;
        const txBlocksList = this.txBlocks.list;
        const txBlocksNumbers = Object.keys(this.txBlocks.list);
        const txBlocks = txBlocksNumbers.map((blockNumber) => ({
            BlockNum: Number(blockNumber),
            Hash: txBlocksList[blockNumber].blockHash
        }));

        return JSON.stringify({
            txBlocks,
            blockHash: String(this.blockHash),
            blockNum: header.blockNum,
            prevHash: header.prevHash,
            version: header.version,
            timestamp: this.timestamp,
            difficulty: this.difficulty,
            dsDifficulty: header.dsDifficulty,
            leaderPubKey: header.leaderPubKey,
            gasPrice: header.gasPrice.toString()
        });
    }

    /**
     * Starts the mining process on the block. It changes the 'nonce' until the hash
     * of the block starts with enough zeros (= difficulty)
     */
    isValid(): boolean {
        if (this.blockHash !== this.calculateHash()) {
            return false;
        }

        const header = this.getHeader() as DSBlockHeader;
        const blocks = Object.keys(this.txBlocks.list);

        for (let index = 0; index < blocks.length; index++) {
            const key = Number(blocks[index]);
            const txBlock = this.txBlocks.list[key];

            if (!txBlock.isValid()) {
                this.txBlocks.rm(key);
            }
        }

        return validator(this.blockHash, header.dsDifficulty);
    }
}

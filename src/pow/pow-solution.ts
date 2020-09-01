import { BaseBlock } from '../common/block';
import chalk from 'chalk';

export class PowSolution {
    /**
     * Mines a block.
     *
     * Finds a special number (called nonce) which, combined with the rest of the
     * fields of the block, produces a hash that complies with the difficulty
     * requirements of the blockchain.
     *
     * @param {Block} block The block to mine.
     *
     * @returns {Promise} A promise for the mined block.
     */
    mineBlock<T extends BaseBlock>(block: T): Promise<T> {
        const minedBlock = block;

        if (!(block instanceof BaseBlock)) {
            throw new Error()
        }

        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (minedBlock.isValid()) {
                    resolve(minedBlock);

                    clearInterval(interval);

                    console.info(
                        `${chalk.bold.greenBright(block.constructor.name)} 
                        ${chalk.cyan('block-number', block.blockHeader.blockNum)} 
                        ${chalk.cyan('hash', block.blockHash)} 
                        ${chalk.cyan('Timestamp', new Date(block.timestamp).toISOString())}`
                    );
                } else {
                    minedBlock.blockHash = minedBlock.calculateHash();
                }
            }, 1000 + block.difficulty);
        });
    }
}

import { BaseBlock } from '../common/block';
import chalk from 'chalk';

export class PowSolution {
    constructor() {}

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
    mineDSBlock(block: BaseBlock): Promise<BaseBlock> {
        const minedBlock = block;

        return new Promise((resolve) => {
            (function loop() {
                if (minedBlock.isValid()) {
                    resolve(minedBlock);

                    console.info(
                        `${chalk.bold.greenBright(block.constructor.name)} 
                        ${chalk.cyan('block-number', block.blockHeader.blockNum)} 
                        ${chalk.cyan('hash', block.blockHash)} 
                        ${chalk.cyan('Timestamp', new Date(block.timestamp).toISOString())}`
                    );
                } else {
                    minedBlock.incrementBlockNumber();
                    minedBlock.calculateHash();
                    // Give Node.js the chance to clear the stack.
                    setImmediate(loop);
                }
            })();
        });
    }
}

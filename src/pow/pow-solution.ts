import BN from 'bn.js';

import { DSBlock, BaseBlock } from 'src/common/block';

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
    mineDSBlock(block: DSBlock): Promise<BaseBlock> {
        const minedBlock = block;

        return new Promise((resolve) => {
            (function loop() {
                if (minedBlock.isValid()) {
                    resolve(minedBlock);
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
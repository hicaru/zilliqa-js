import { BlockChain } from './common';
import {
    DIFFICULTY,
    DS_DIFFICULTY,
    VERSION,
    GENESIS_TX_BLOCK,
    GENESIS_BLOCK_NUMBER,
    ZERO_HASH,
    MINER_PUBKEY,
    DEFAULT_GAS_PRICE
} from './config';
import App from './server';

export function main() {
    const chain = new BlockChain(
        DIFFICULTY,
        DS_DIFFICULTY,
        VERSION,
        GENESIS_TX_BLOCK,
        GENESIS_BLOCK_NUMBER,
        ZERO_HASH,
        MINER_PUBKEY,
        DEFAULT_GAS_PRICE
    );
    
    // Starting jsonRPC server.
    App(chain);
}

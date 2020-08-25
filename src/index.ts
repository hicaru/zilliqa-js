import { BlockChain } from './common';
import {
    DIFFICULTY,
    DS_DIFFICULTY,
    VERSION,
    GENESIS_TX_BLOCK,
    GENESIS_BLOCK_NUMBER,
    ZERO_HASH,
    MINER_PUBKEY,
    CHAIN_ID,
    DEFAULT_GAS_PRICE
} from './config';
import App from './server';
import { MemmoryStorage } from './storage';

export function main() {
    const storage = new MemmoryStorage();
    const chain = new BlockChain(
        DIFFICULTY,
        DS_DIFFICULTY,
        VERSION,
        GENESIS_TX_BLOCK,
        GENESIS_BLOCK_NUMBER,
        ZERO_HASH,
        MINER_PUBKEY,
        DEFAULT_GAS_PRICE,
        CHAIN_ID,
        storage
    );
    
    // Starting jsonRPC server.
    App(chain);
}

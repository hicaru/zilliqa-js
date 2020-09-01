import { generateMnemonic } from 'bip39';
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
    DEFAULT_GAS_PRICE,
    TX_BLOCKS_PEAR_DS_BLOCK
} from './config';
import App from './server';
import { MemmoryStorage } from './storage';

export function main() {
    const mnemonic = 'abstract silly element program name ten champion thing odor nerve wasp smooth' // generateMnemonic();
    const storage = new MemmoryStorage();
    const chain = new BlockChain(
        TX_BLOCKS_PEAR_DS_BLOCK,
        DIFFICULTY,
        DS_DIFFICULTY,
        VERSION,
        GENESIS_TX_BLOCK,
        GENESIS_BLOCK_NUMBER,
        ZERO_HASH,
        MINER_PUBKEY,
        DEFAULT_GAS_PRICE,
        CHAIN_ID,
        storage,
        mnemonic
    );

    chain.start();
    
    // Starting jsonRPC server.
    App(chain);
}

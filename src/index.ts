import { generateMnemonic } from 'bip39';
import BN from 'bn.js';
import { BlockChain, TxBlock, TxBlockHeader } from './common';
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
    TX_BLOCKS_PEAR_DS_BLOCK, GasLimits
} from './config';
import App from './server';
import { MemmoryStorage } from './storage';

const mnemonic = generateMnemonic();
const storage = new MemmoryStorage();

export function main(
    txblockPerDs = TX_BLOCKS_PEAR_DS_BLOCK,
    difficulty = DIFFICULTY,
    dsDifficulty = DS_DIFFICULTY,
    version = VERSION,
    genesisTxblock = GENESIS_TX_BLOCK,
    genesisBlockNumber = GENESIS_BLOCK_NUMBER,
    zeroHash = ZERO_HASH,
    miner = MINER_PUBKEY,
    defaultGasPrice = DEFAULT_GAS_PRICE,
    chainID = CHAIN_ID,
    store = storage,
    initSeed = mnemonic
) {
    const chain = new BlockChain(
        txblockPerDs,
        difficulty,
        dsDifficulty,
        version,
        genesisTxblock,
        genesisBlockNumber,
        zeroHash,
        miner,
        defaultGasPrice,
        chainID,
        store,
        initSeed
    );

    chain.start();
    
    // Starting jsonRPC server.
    App(chain);
}

export * from './config';
export * from './common';
export * from './server';
export * from './storage';

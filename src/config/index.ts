import BN from 'bn.js';
import { SWInfo, DSBlock, DSBlockHeader } from 'src/common';

export const VERSION = new BN(1);
export const ZERO_HASH = '0000000000000000000000000000000000000000000000000000000000000000';
export const DIFFICULTY = 5;
export const DS_DIFFICULTY = 10;
export const MINER_PUBKEY = '0x02AAE728127EB5A30B07D798D5236251808AD2C8BA3F18B230449D0C938969B552';
export const GENESIS_BLOCK_NUMBER = 0;
export const DEFAULT_GAS_PRICE = new BN('1000000000');
export const DEFAULT_SW_INFO = new SWInfo();
export const GENESIS_DS_BLOCK = new DSBlock(
    new Date().valueOf(),
    DS_DIFFICULTY,
    new DSBlockHeader(
        VERSION,
        ZERO_HASH,
        DS_DIFFICULTY,
        DIFFICULTY,
        MINER_PUBKEY,
        GENESIS_BLOCK_NUMBER,
        GENESIS_BLOCK_NUMBER,
        DEFAULT_GAS_PRICE
    )
);

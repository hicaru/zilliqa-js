import BN from 'bn.js';
import os from 'os';
import { TxBlockHeader, TxBlock } from '../common';
import { SWInfo } from '../common/sw-info';

export enum GasLimits {
    DS = '100 000 000',
    TX = '100 000',
    M = '100'
}

export enum TransactionStatuses {
    TransactionIsNotPending = 0,
    NonceIsHigherThanExpected = 1,
    TransactionNotFound = 4,
    TransactionCausedMathError = 10,
    ScillaInvocationError = 11,
    ContractAccountInitializationError = 12,
    InvalidSourceAccount = 13,
    GasLimitHigherThanShardGasLimit = 14,
    UnknownTransactionType = 15,
    TransactionSentToWrongShard = 16,
    ContractSourceAccountCrossShardIssue = 17,
    CodeSizeExceededLimit = 18,
    TransactionVerificationFailed = 19,
    GasLimitTooLow = 20,
    InsufficientBalance = 21,
    InsufficientGasToInvokeScillaChecker = 22,
    DuplicateTransactionExists = 23,
    TransactionWithHigherGasPriceExists = 24,
    InvalidDestinationAddress = 25,
    FailedToAddContractAccountToState = 26
}

export const HOME_DIR = `${os.homedir()}/zilliqa-store`;
export const VERSION = new BN(1);
export const CHAIN_ID = new BN(334);
export const ZERO_HASH = '0000000000000000000000000000000000000000000000000000000000000000';
export const DIFFICULTY = 10;
export const DS_DIFFICULTY = 20;
export const MINER_PUBKEY = '0x02AAE728127EB5A30B07D798D5236251808AD2C8BA3F18B230449D0C938969B552';
export const GENESIS_BLOCK_NUMBER = 0;
export const DEFAULT_GAS_PRICE = new BN('1000000000');
export const PORT = 80;
export const TX_BLOCKS_PEAR_DS_BLOCK = 100;

export const AMOUNT_OF_ACCOUNTS = 5;
export const INITIAL_BALANCE = new BN('10000000000000000000');

export const DEFAULT_SW_INFO = new SWInfo();
export const GENESIS_TX_BLOCK = new TxBlock(
    new Date().valueOf(),
    DIFFICULTY,
    new TxBlockHeader(
        VERSION,
        new BN(GasLimits.TX),
        GENESIS_BLOCK_NUMBER,
        ZERO_HASH,
        MINER_PUBKEY,
        GENESIS_BLOCK_NUMBER
    )
);

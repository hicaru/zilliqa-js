import { Request, Response } from 'express';

import CreateTransaction from './create-transaction';
import GetTransaction from './get-transaction';
import GetPendingTxn from './get-pending-txn';
import GetPendingTxns from './get-pending-txns';
import GetRecentTransactions from './get-recent-transactions';
import GetTransactionsForTxBlock from './get-transactions-for-tx-block';
import GetTxnBodiesForTxBlock from './get-txn-bodies-for-tx-block';
import GetNumTxnsTxEpoch from './get-num-txns-tx-epoch';
import GetNumTxnsDSEpoch from './get-num-txns-ds-epoch';
import GetMinimumGasPrice from './get-minimum-gas-price';

import { Methods } from '../../methods';

export default {
    CreateTransaction,
    GetTransaction,
    GetPendingTxn,
    GetPendingTxns,
    GetRecentTransactions,
    GetTransactionsForTxBlock,
    GetTxnBodiesForTxBlock,
    GetNumTxnsTxEpoch,
    GetNumTxnsDSEpoch,
    GetMinimumGasPrice
};

export function transactionRoute(method: string, req: Request, res: Response) {
    switch (method) {
        case Methods.CREATE_TRANSACTION:
            return CreateTransaction(req, res);
        case Methods.GET_TRANSACTION:
            return GetTransaction(req, res);
        case Methods.GET_PENDING_TXN:
            return GetPendingTxn(req, res);
        case Methods.GET_PENDING_TXNS:
            return GetPendingTxns(req, res);
        case Methods.GET_RECENT_TRANSACTIONS:
            return GetRecentTransactions(req, res);
        case Methods.GET_TRANSACTIONS_FOR_TX_BLOCK:
            return GetTransactionsForTxBlock(req, res);
        case Methods.GET_TXN_BODIES_FOR_TX_BLOCK:
            return GetTxnBodiesForTxBlock(req, res);
        case Methods.GET_NUM_TXNS_TX_EPOCH:
            return GetNumTxnsTxEpoch(req, res);
        case Methods.GET_NUM_TXNS_DS_EPOCH:
            return GetNumTxnsDSEpoch(req, res);
        case Methods.GET_MINIMUM_GAS_PRICE:
            return GetMinimumGasPrice(req, res);
        default:
            break;
    }
}

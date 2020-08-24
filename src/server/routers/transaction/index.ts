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

        default:
            break;
    }
}

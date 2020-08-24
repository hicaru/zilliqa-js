import express from 'express';
import { Request, Response } from 'express';

import { Methods } from '../methods';

import GetNetworkId from './get-network-id';
import GetBlockchainInfo from './get-blockchain-info';
import GetDsBlock from './get-ds-block';
import GetLatestDsBlock from './get-latest-ds-block';
import GetNumDSBlocks from './get-num-ds-blocks';
import GetDSBlockRate from './get-ds-block-rate';
import DSBlockListing from './ds-block-listing';
import GetTxBlock from './get-tx-block';
import GetLatestTxBlock from './get-latest-tx-block';
import GetNumTxBlocks from './get-num-tx-blocks';
import GetTxBlockRate from './get-tx-block-rate';
import TxBlockListing from './tx-block-listing';
import GetNumTransactions from './get-num-transactions';
import GetTransactionRate from './get-transaction-rate';
import GetCurrentMiniEpoch from './get-current-mini-epoch';
import GetCurrentDSEpoch from './get-current-ds-epoch';
import GetPrevDifficulty from './get-prev-difficulty';

const router = express();

function jsonRPC(req: Request, res: Response) {
    const { method } = req.body;
     
    switch (method) {
        case Methods.GET_NETWORK_ID:
            return GetNetworkId(req, res);
        case Methods.GET_BLOCKCHAIN_INFO:
            return GetBlockchainInfo(req, res);
        case Methods.GET_DS_BLOCK:
            return GetDsBlock(req, res);
        case Methods.GET_LATEST_DS_BLOCK:
            return GetLatestDsBlock(req, res);
        case Methods.GET_NUM_DS_BLOCKS:
            return GetNumDSBlocks(req, res);
        case Methods.GET_DS_BLOCK_RATE:
            return GetDSBlockRate(req, res);
        case Methods.DS_BLOCK_LISTING:
            return DSBlockListing(req, res);
        case Methods.GET_TX_BLOCK:
            return GetTxBlock(req, res);
        case Methods.GET_LATEST_TX_BLOCK:
            return GetLatestTxBlock(req, res);
        case Methods.GET_NUM_TX_BLOCKS:
            return GetNumTxBlocks(req, res);
        case Methods.GET_TX_BLOCK_RATE:
            return GetTxBlockRate(req, res);
        case Methods.TX_BLOCK_LISTING:
            return TxBlockListing(req, res);
        case Methods.GET_NUM_TRANSACTIONS:
            return GetNumTransactions(req, res);
        case Methods.GET_TRANSACTION_RATE:
            return GetTransactionRate(req, res);
        case Methods.GET_CURRENT_MINI_EPOCH:
            return GetCurrentMiniEpoch(req, res);
        case Methods.GET_CURRENT_DS_EPOCH:
            return GetCurrentDSEpoch(req, res);
        case Methods.GET_PREV_DIFFICULTY:
            return GetPrevDifficulty(req, res);
    }
}

router.post('/', jsonRPC);

export default router;

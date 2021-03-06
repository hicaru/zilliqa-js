export enum Methods {
    GET_NETWORK_ID = 'GetNetworkId',
    GET_BLOCKCHAIN_INFO = 'GetBlockchainInfo',
    GET_DS_BLOCK = 'GetDsBlock',
    GET_LATEST_DS_BLOCK = 'GetLatestDsBlock',
    GET_NUM_DS_BLOCKS = 'GetNumDSBlocks',
    GET_DS_BLOCK_RATE = 'GetDSBlockRate',
    DS_BLOCK_LISTING = 'DSBlockListing',
    GET_TX_BLOCK = 'GetTxBlock',
    GET_LATEST_TX_BLOCK = 'GetLatestTxBlock',
    GET_NUM_TX_BLOCKS = 'GetNumTxBlocks',
    GET_TX_BLOCK_RATE = 'GetTxBlockRate',
    TX_BLOCK_LISTING = 'TxBlockListing',
    GET_NUM_TRANSACTIONS = 'GetNumTransactions',
    GET_TRANSACTION_RATE = 'GetTransactionRate',
    GET_CURRENT_MINI_EPOCH = 'GetCurrentMiniEpoch',
    GET_CURRENT_DS_EPOCH = 'GetCurrentDSEpoch',
    GET_PREV_DIFFICULTY = 'GetPrevDifficulty',
    GET_PREV_DS_DIFFICULTY = 'GetPrevDSDifficulty',
    GET_TOTAL_COIN_SUPPLY = 'GetTotalCoinSupply',
    GET_MINER_INFO = 'GetMinerInfo',

    CREATE_TRANSACTION = 'CreateTransaction',
    GET_TRANSACTION = 'GetTransaction',
    GET_PENDING_TXN = 'GetPendingTxn',
    GET_PENDING_TXNS = 'GetPendingTxns',
    GET_RECENT_TRANSACTIONS = 'GetRecentTransactions',
    GET_TRANSACTIONS_FOR_TX_BLOCK = 'GetTransactionsForTxBlock',
    GET_TXN_BODIES_FOR_TX_BLOCK = 'GetTxnBodiesForTxBlock',
    GET_NUM_TXNS_TX_EPOCH = 'GetNumTxnsTxEpoch',
    GET_NUM_TXNS_DS_EPOCH = 'GetNumTxnsDSEpoch',
    GET_MINIMUM_GAS_PRICE = 'GetMinimumGasPrice',

    GET_SMART_CONTRACT_CODE = 'GetSmartContractCode',
    GET_SMART_CONTRACT_INIT = 'GetSmartContractInit',
    GET_SMART_CONTRACT_SUB_STATE = 'GetSmartContractSubState',
    GET_SMART_CONTRACT_STATE = 'GetSmartContractState',
    GET_SMART_CONTRACTS = 'GetSmartContracts',
    GET_CONTRACT_ADDRESS_FROM_TRANSACTION_ID = 'GetContractAddressFromTransactionID',

    GET_BALANCE = 'GetBalance'
}

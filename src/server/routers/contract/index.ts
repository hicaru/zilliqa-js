import { Request, Response } from 'express';

import GetSmartContractCode from './get-smart-contract-code';
import GetSmartContractInit from './get-smart-contract-init';
import GetSmartContractSubState from './get-smart-contract-sub-state';
import GetSmartContractState from './get-smart-contract-state';
import GetSmartContracts from './get-smart-contracts';
import GetContractAddressFromTransactionID from './get-contract-address-from-transaction-id';

import { Methods } from '../../methods';

export default {
    GetSmartContractCode,
    GetSmartContractInit,
    GetSmartContractSubState,
    GetSmartContractState,
    GetSmartContracts,
    GetContractAddressFromTransactionID
};

export function transactionRoute(method: string, req: Request, res: Response) {
    switch (method) {

        case Methods.GET_SMART_CONTRACT_CODE:
            return GetSmartContractCode(req, res);
        case Methods.GET_SMART_CONTRACT_INIT:
            return GetSmartContractInit(req, res);
        case Methods.GET_SMART_CONTRACT_SUB_STATE:
            return GetSmartContractSubState(req, res);
        case Methods.GET_SMART_CONTRACT_STATE:
            return GetSmartContractState(req, res);
        case Methods.GET_SMART_CONTRACTS:
            return GetSmartContracts(req, res);
        case Methods.GET_CONTRACT_ADDRESS_FROM_TRANSACTION_ID:
            return GetContractAddressFromTransactionID(req, res);

        default:
            break;
    }
}

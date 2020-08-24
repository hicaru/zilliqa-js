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

        default:
            break;
    }
}

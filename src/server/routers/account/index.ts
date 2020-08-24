import { Request, Response } from 'express';

import GetBalance from './get-balance';

import { Methods } from '../../methods';

export default {
    GetBalance
};

export function accountRoute(method: string, req: Request, res: Response) {
    switch (method) {

        case Methods.GET_BALANCE:
            return GetBalance(req, res);

        default:
            break;
    }
}

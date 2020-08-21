import { Request, Response, NextFunction } from 'express';
import { RPCErrorCode } from '../errors';
import { Methods } from '../methods';

export default function(req: Request, res: Response, next: NextFunction) {
    const { method, body } = req;

    if (body && body.method && !Object.values(Methods).includes(body.method)) {
        return res.json({
            code: RPCErrorCode.RPC_METHOD_NOT_FOUND
        });
    }

    if (!body || !body.id || !body.jsonrpc || !body.method || !body.params) {
        return res.json({
            code: RPCErrorCode.RPC_INVALID_PARAMS
        });
    }

    if (method !== 'POST' || !body) {
        return res.json({
            code: RPCErrorCode.RPC_INVALID_REQUEST
        });
    }

    return next();
}

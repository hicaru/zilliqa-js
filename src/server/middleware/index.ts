import { Request, Response, NextFunction } from 'express';
import { RPCErrorCode } from '../errors';
import { Methods } from '../methods';

export default function(req: Request, res: Response, next: NextFunction) {
    const { method, body } = req;

    if (body && body.method && !Object.values(Methods).includes(body.method)) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                code: RPCErrorCode.RPC_METHOD_NOT_FOUND,
                data: null,
                message: 'RPC_METHOD_NOT_FOUND: The method being requested is not available on this server'
            }
        });
    }

    if (!body || !body.id) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.PROCEDURE_IS_METHOD,
                message: 'PROCEDURE_IS_METHOD: The requested notification is declared as a method'
            }
        });
    }

    if (!body && !body.params) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.JSON_PARSE_ERROR,
                message: 'JSON_PARSE_ERROR: The JSON-Object is not JSON-Valid'
            }
        });
    }

    if (body && (!body.jsonrpc || !body.method)) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.INVALID_JSON_REQUEST,
                message: 'INVALID_JSON_REQUEST: The JSON sent is not a valid JSON-RPC Request object'
            }
        });
    }

    if (method !== 'POST' || !body) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.RPC_INVALID_REQUEST,
                message: ''
            }
        });
    }

    return next();
}

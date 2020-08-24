import { RPCErrorCode } from './errors';

export function invalidParams(id: string = '1', jsonrpc: string = '2.0', data: object | string | null = null) {
    return {
        id,
        jsonrpc,
        error: {
            data,
            code: RPCErrorCode.RPC_INVALID_PARAMS,
            message: 'INVALID_PARAMS: Invalid method parameters (invalid name and/or type) recognised'
        }
    }
}

export function internalError(id: string = '1', jsonrpc: string = '2.0', msg: string, data = null) {
    return {
        id,
        jsonrpc,
        error: {
            data,
            code: RPCErrorCode.RPC_INTERNAL_ERROR,
            message: 'INTERNAL_ERROR: ' + msg
        }
    }
}
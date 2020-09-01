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

export function notSupport(id: string = '1', jsonrpc: string = '2.0', msg: string, data = null) {
    return {
        id,
        jsonrpc,
        error: {
            data,
            code: RPCErrorCode.CURRENT_VERSION_IS_NOT_SUPPORT,
            message: 'CURRENT_VERSION_IS_NOT_SUPPORT: ' + msg
        }
    }
}
export function unableToVerifyTransaction(id: string = '1', jsonrpc: string = '2.0', data = null) {
    return {
        id,
        jsonrpc,
        error: {
            data,
            code: RPCErrorCode.RPC_VERIFY_REJECTED,
            message: 'Unable to verify transaction'
        }
    }
}

export function UnableToProcess(id: string = '1', jsonrpc: string = '2.0', data = null) {
    return {
        id,
        jsonrpc,
        error: {
            data,
            code: RPCErrorCode.RPC_MISC_ERROR,
            message: 'Unable to Process'
        }
    }
}

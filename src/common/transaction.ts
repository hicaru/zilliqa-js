import BN from 'bn.js';
import { sha256 } from 'hash.js';
import { encodeTransactionProto } from '@zilliqa-js/account/dist//util';
import { Long } from '@zilliqa-js/util';
import { schnorr } from '@zilliqa-js/crypto';

import { Account } from './account';

export class Transaction {
    private _bytes: Buffer;

    nonce: number;
    amount: string;
    gasPrice: string;
    gasLimit: string;
    version: number;
    priority: boolean;
    code: string;
    data: string;
    toAddr: string;
    pubKey: string;
    signature: string;
    account: Account;

    get message() {
        return JSON.stringify({
            amount: String(this.amount),
            code: this.code,
            data: this.data,
            gasLimit: String(this.gasLimit),
            gasPrice: String(this.gasPrice),
            nonce: String(this.nonce),
            priority: this.priority,
            pubKey: String(this.pubKey),
            toAddr: String(this.toAddr).toLowerCase(),
            version: String(this.version)
        });
    }

    /**
     * Creates a SHA256 hash of the transaction
     */
    get hash() {
        const sha256HashSum = sha256()
            .update(this._bytes)
            .digest('hex');

        return sha256HashSum;
    }

    get info() {
        if (!this.data && !this.code) {
            return 'Non-contract txn, sent to shard';
        } else if (this.data && this.code) {
            return 'Contract Creation txn, sent to shard';
        } else if (this.data && !this.code) {
            return 'Contract Txn, Sent To Ds';
        }

        return 'Contract Txn, Shards Match of the sender and reciever';
    }

    constructor(
        version: number,
        nonce: number,
        amount: string,
        gasPrice: string,
        gasLimit: string,
        code: string,
        data: string,
        toAddr: string,
        pubKey: string,
        signature: string,
        priority = false
    ) {
        this.version = version;
        this.nonce = nonce;
        this.amount = amount;
        this.gasPrice = gasPrice;
        this.gasLimit = gasLimit;
        this.code = code;
        this.data = data;
        this.toAddr = toAddr;
        this.pubKey = pubKey;
        this.signature = signature;
        this.priority = priority;

        this.account = new Account(this.pubKey, 0, new BN(0));
        this._bytes = encodeTransactionProto({
            version,
            toAddr,
            nonce,
            code,
            data,
            pubKey,
            amount: new BN(amount),
            gasLimit: Long.fromNumber(Number(gasLimit)),
            gasPrice: new BN(gasPrice)
        });
    }

    /**
     * Checks if the signature is valid (transaction has not been tampered with).
     * It uses the fromAddress as the public key.
     *
     * @returns {boolean}
     */
    public isValid(): boolean {
        try {
            const publicKey = Buffer.from(this.pubKey, 'hex');
            const signature = schnorr.toSignature(this.signature);

            return schnorr.verify(
                this._bytes,
                signature,
                publicKey
            );
        } catch {
            return false;
        }
    }

}

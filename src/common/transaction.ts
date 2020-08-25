import BN from 'bn.js';
import schnorr from 'bip-schnorr';
import { SHA256 } from 'crypto-js';

import { Account } from './account';

export class Transaction {
    version: BN;
    nonce: BN;
    amount: BN;
    gasPrice: BN;
    gasLimit: BN;
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
        return SHA256(this.message).toString();
    }

    constructor(
        version: BN,
        nonce: BN,
        amount: BN,
        gasPrice: BN,
        gasLimit: BN,
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
    }

    /**
     * Checks if the signature is valid (transaction has not been tampered with).
     * It uses the fromAddress as the public key.
     *
     * @returns {boolean}
     */
    public isValid(): boolean {
        const publicKey = Buffer.from(this.pubKey, 'hex');
        const signatureToVerify = Buffer.from(this.signature, 'hex');

        try {
            return schnorr.verify(publicKey, this.message, signatureToVerify);
        } catch {
            return false;
        }
    }

}

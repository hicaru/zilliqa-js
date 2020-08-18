import BN from 'bn.js';
import { SHA256 } from 'crypto-js';

export class Transaction {
    version: BN;
    nonce: BN;
    amount: BN;
    gasPrice: BN;
    gasLimit: BN;
    code: string;
    data: string;
    toAddr: string;
    senderKeyPair: {
        first: string;
        second: string;
    };
    signature: string;

    /**
     * Creates a SHA256 hash of the transaction
     */
    get hash() {
        const payload =
            String(this.version) +
            String(this.nonce) + 
            String(this.toAddr) +
            String(this.senderKeyPair.second) +
            String(this.amount) +
            String(this.gasPrice) +
            String(this.gasLimit) +
            String(this.code) +
            String(this.data);

        return SHA256(payload).toString();
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
        senderKeyPair: {
            first: string;
            second: string;
        },
        signature: string
    ) {
        this.version = version;
        this.nonce = nonce;
        this.amount = amount;
        this.gasPrice = gasPrice;
        this.gasLimit = gasLimit;
        this.code = code;
        this.data = data;
        this.toAddr = toAddr;
        this.senderKeyPair = senderKeyPair;
        this.signature = signature;
    }

}
  
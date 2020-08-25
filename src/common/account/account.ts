import BN from 'bn.js';
import elliptic from 'elliptic';

export class Account {
    private _secp256k1 = new elliptic.ec('secp256k1');

    pubKey!: string;
    nonce!: number;

    balance: BN = new BN(0);

    get address() {
        return this._secp256k1.keyFromPublic(this.pubKey);
    }

    constructor(pubKey: string, nonce: number, balance: BN) {
        this.pubKey = pubKey;
        this.nonce = nonce;
        this.balance = balance;
    }
}

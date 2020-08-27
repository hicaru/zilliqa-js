import BN from 'bn.js';
import { getAddressFromPublicKey } from '@zilliqa-js/crypto/dist/util';

export class Account {
    pubKey!: string;
    address!: string;
    nonce?: number;

    balance?: BN = new BN(0);

    constructor(pubKey: string, nonce?: number, balance?: BN) {
        this.pubKey = pubKey;
        this.nonce = nonce;
        this.balance = balance;
        this.address = getAddressFromPublicKey(this.pubKey).replace('0x', '').toLowerCase();
    }

    serialize() {
        return JSON.stringify({
            pubKey: this.pubKey,
            nonce: this.nonce,
            balance: this.balance?.toString()
        });
    }
}

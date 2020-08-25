import BN from 'bn.js';
import { getAddressFromPublicKey } from '@zilliqa-js/crypto/dist/util';

export class Account {
    pubKey!: string;
    nonce?: number;

    balance?: BN = new BN(0);

    get address() {
        return getAddressFromPublicKey(this.pubKey).replace('0x', '');
    }

    constructor(pubKey: string, nonce?: number, balance?: BN) {
        this.pubKey = pubKey;
        this.nonce = nonce;
        this.balance = balance;
    }
}

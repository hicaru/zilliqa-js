import BN from 'bn.js';
import { getAddressFromPublicKey } from '@zilliqa-js/crypto/dist/util';
import { normalizedAddress } from '../../utils';

export class Account {
    pubKey?: string;
    address!: string;
    nonce: number;

    balance: BN = new BN(0);

    public static fromPubKey(pubKey: string, nonce?: number, balance?: BN) {
        const address = normalizedAddress(getAddressFromPublicKey(pubKey));

        return new Account(address, nonce, balance, pubKey);
    }

    constructor(address: string, nonce: number = 0, balance: BN = new BN(0), pubKey?: string) {
        this.pubKey = pubKey;
        this.nonce = nonce;
        this.balance = balance;
        this.address = normalizedAddress(address);
    }

    public increaseBalance(amount: BN) {
        this.balance.add(amount);
    }

    public reduceBalance(amount: BN) {
        this.balance.sub(amount);
    }

    public serialize() {
        return JSON.stringify({
            nonce: this.nonce,
            balance: this.balance?.toString()
        });
    }
}

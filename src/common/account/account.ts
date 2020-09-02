import BN from 'bn.js';
import { getAddressFromPublicKey } from '@zilliqa-js/crypto/dist/util';
import { normalizedHex } from '../../utils';

export class Account {
    pubKey?: string;
    address!: string;
    nonce: number;

    balance: BN = new BN(0);

    public static fromPubKey(pubKey: string, nonce?: number, balance?: BN) {
        const address = normalizedHex(getAddressFromPublicKey(pubKey));

        return new Account(address, nonce, balance, pubKey);
    }

    constructor(address: string, nonce: number = 0, balance: BN = new BN(0), pubKey?: string) {
        this.pubKey = pubKey;
        this.nonce = nonce;
        this.balance = balance;
        this.address = normalizedHex(address);
    }

    public increaseBalance(amount: BN) {
        const _amount = new BN(amount);
        const _balance = new BN(this.balance);
        const _result = _balance.add(_amount);

        this.balance = new BN(_result);
    }

    public reduceBalance(amount: BN) {
        const _amount = new BN(amount);
        const _balance = new BN(this.balance);
        const _result = _balance.sub(_amount);

        this.balance = new BN(_result);
    }

    public increaseNonce() {
        this.nonce++;
    }

    public serialize() {
        return JSON.stringify({
            nonce: this.nonce,
            balance: this.balance?.toString()
        });
    }
}

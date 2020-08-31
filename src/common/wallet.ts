import { Wallet } from '@zilliqa-js/account';
import { HTTPProvider } from '@zilliqa-js/core';

import { Account } from './account';
import { AMOUNT_OF_ACCOUNTS, INITIAL_BALANCE } from '../config';
import BN from 'bn.js';

export class WalletCtrl {
    wallet = new Wallet(new HTTPProvider(''));

    get addresses() {
        return Object
            .values(this.wallet.accounts)
            .map((account) => this._toAddress(account.address));
    }

    constructor(mnemonic: string) {
        for (let index = 0; index < AMOUNT_OF_ACCOUNTS; index++) {
            this.wallet.addByMnemonic(mnemonic, index);
        }
    }

    private _toAddress(address: string) {
        return String(address).toLowerCase().replace('0x', '');
    }

    initAccounts() {
        return this
            .addresses
            .map((address) => new Account(address, 0, INITIAL_BALANCE));
    }
}

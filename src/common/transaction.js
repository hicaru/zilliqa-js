"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const crypto_js_1 = require("crypto-js");
class Transaction {
    constructor(version, nonce, amount, gasPrice, gasLimit, code, data, toAddr, senderKeyPair, signature) {
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
    /**
     * Creates a SHA256 hash of the transaction
     */
    get hash() {
        const payload = String(this.version) +
            String(this.nonce) +
            String(this.toAddr) +
            String(this.senderKeyPair.second) +
            String(this.amount) +
            String(this.gasPrice) +
            String(this.gasLimit) +
            String(this.code) +
            String(this.data);
        return crypto_js_1.SHA256(payload).toString();
    }
    /**
     * Signs a transaction with the given signingKey (which is an Elliptic keypair
     * object that contains a private key). The signature is then stored inside the
     * transaction object and later stored on the blockchain.
     */
    signTransaction(signingKey) {
        // You can only send a transaction from the wallet that is linked to your
        // key. So here we check if the fromAddress matches your publicKey
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }
        // Calculate the hash of this transaction, sign it with the key
        // and store it inside the transaction obect
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }
    /**
     * Checks if the signature is valid (transaction has not been tampered with).
     * It uses the fromAddress as the public key.
     */
    isValid() {
        // If the transaction doesn't have a from address we assume it's a
        // mining reward and that it's valid. You could verify this in a
        // different way (special field for instance)
        if (this.fromAddress === null)
            return true;
        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
    /**
     * Identifies the shard number that should process the transaction.
     */
    getShardIndex(fromAddr, numShards) {
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map
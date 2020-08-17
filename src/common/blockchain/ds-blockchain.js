"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSBlockChain = void 0;
const blockchain_1 = require("./blockchain");
class DSBlockChain extends blockchain_1.BlockChain {
    getBlockFromPersistentStorage() {
        // TODO: make storage.
    }
}
exports.DSBlockChain = DSBlockChain;
//# sourceMappingURL=ds-blockchain.js.map
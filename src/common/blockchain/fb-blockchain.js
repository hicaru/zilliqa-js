"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackBlockChain = void 0;
const blockchain_1 = require("./blockchain");
class FallbackBlockChain extends blockchain_1.BlockChain {
    getBlockFromPersistentStorage() { }
}
exports.FallbackBlockChain = FallbackBlockChain;
//# sourceMappingURL=fb-blockchain.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VCBlockChain = void 0;
const blockchain_1 = require("./blockchain");
class VCBlockChain extends blockchain_1.BlockChain {
    getBlockFromPersistentStorage() {
        throw new Error('vc block persistent storage not supported');
    }
}
exports.VCBlockChain = VCBlockChain;
//# sourceMappingURL=vc-blockchain.js.map
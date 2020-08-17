"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENESIS_DS_BLOCK = exports.DEFAULT_SW_INFO = exports.DEFAULT_GAS_PRICE = exports.GENESIS_BLOCK_NUMBER = exports.MINER_PUBKEY = exports.DS_DIFFICULTY = exports.DIFFICULTY = exports.ZERO_HASH = exports.VERSION = void 0;
const bn_js_1 = require("bn.js");
const common_1 = require("src/common");
exports.VERSION = new bn_js_1.default(1);
exports.ZERO_HASH = '0000000000000000000000000000000000000000000000000000000000000000';
exports.DIFFICULTY = 5;
exports.DS_DIFFICULTY = 10;
exports.MINER_PUBKEY = '0x02AAE728127EB5A30B07D798D5236251808AD2C8BA3F18B230449D0C938969B552';
exports.GENESIS_BLOCK_NUMBER = 0;
exports.DEFAULT_GAS_PRICE = new bn_js_1.default('1000000000');
exports.DEFAULT_SW_INFO = new common_1.SWInfo();
exports.GENESIS_DS_BLOCK = new common_1.DSBlock(new Date().valueOf(), exports.DS_DIFFICULTY, new common_1.DSBlockHeader(exports.VERSION, exports.ZERO_HASH, exports.DS_DIFFICULTY, exports.DIFFICULTY, exports.MINER_PUBKEY, exports.GENESIS_BLOCK_NUMBER, exports.GENESIS_BLOCK_NUMBER, exports.DEFAULT_GAS_PRICE));
//# sourceMappingURL=index.js.map
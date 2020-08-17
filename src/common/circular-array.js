"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularArray = void 0;
class CircularArray {
    constructor() {
        this.items = {};
    }
    add(item, key) {
        if (this.getLastnumber() >= key && key !== 0) {
            const msg = 'block number inconsistent, increase the size of, CircularArray, blockNumMissed';
            throw new Error(msg);
        }
        this.items[key] = item;
    }
    reset() {
        this.items = {};
    }
    size() {
        return Object.keys(this.items).length;
    }
    getLastnumber() {
        const keys = Object.keys(this.items).map(Number);
        const lastNumber = Math.max.apply(Math, keys);
        return lastNumber;
    }
    getLast() {
        const lastNumber = this.getLastnumber();
        return this.items[lastNumber];
    }
    has(blockNumber) {
        return Boolean(this.items[blockNumber]);
    }
    get(blockNumber) {
        if (!this.has(blockNumber)) {
            return null;
        }
        return this.items[blockNumber];
    }
}
exports.CircularArray = CircularArray;
//# sourceMappingURL=circular-array.js.map
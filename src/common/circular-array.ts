import { BaseBlock } from 'src/common/block';

export class CircularArray<T> {
    private items: {
        [blockNumber: number]: T;
    } = {}

    add(item: T, key: number) {
        this.items[key] = item;
    }

    reset() {
        this.items = {};
    }

    size(): number {
        return Object.keys(this.items).length;
    }

    getLast(): T {
        const keys = Object.keys(this.items).map(Number);
        const lastNumber = Math.max.apply(Math, keys);

        return this.items[lastNumber];
    }

    has(blockNumber: number) {
        return Boolean(this.items[blockNumber]);
    }

    get(blockNumber: number) {
        if (!this.has(blockNumber)) {
            return null;
        }

        return this.items[blockNumber];
    }
}

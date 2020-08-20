export class CircularArray<T> {
    private items: {
        [blockNumber: number]: T;
    } = {}

    public get list() {
        return this.items;
    }

    add(item: T, key: number) {
        if (this.getLastnumber() >= key && key !== 0) {
            const msg = 'block number inconsistent, increase the size of, CircularArray, blockNumMissed'

            throw new Error(msg);
        }

        this.items[key] = item;
    }

    reset() {
        this.items = {};
    }

    size(): number {
        return Object.keys(this.items).length;
    }

    getLastnumber(): number {
        const keys = Object.keys(this.items).map(Number);
        const lastNumber = Math.max.apply(Math, keys);

        return lastNumber;
    }

    getLast(): T | undefined {
        const lastNumber = this.getLastnumber()

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

export class CircularArray<T> {
    private items: {
        [key: string]: T;
    } = {}

    public get list() {
        return this.items;
    }

    add(item: T, key: number | string) {
        if (this.getLastnumber() >= key && key !== 0) {
            const msg = 'block number inconsistent, increase the size of, CircularArray, blockNumMissed'

            throw new Error(msg);
        }

        this.items[key] = item;
    }

    addList(items: T) {
        this.items = {
            ...this.items,
            ...items
        }
    }

    reset() {
        this.items = {};
    }

    clear() {
        const last = this.getLast();
        const lastnumber = this.getLastnumber();

        if (!last) {
            return null;
        }

        this.items = {
            [lastnumber]: last
        }
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

    has(key: number | string) {
        return Boolean(this.items[key]);
    }

    get(key: number | string) {
        if (!this.has(key)) {
            return null;
        }

        return this.items[key];
    }
}

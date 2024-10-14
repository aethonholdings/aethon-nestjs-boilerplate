import { Cacheable } from "src/common/types/types";

export class mockCacheManager {
    _data: any;

    constructor() {
        this._data = {};
    }

    get = jest.fn(async <T>(key: string) => {
        return this._data[key];
    });
    set = jest.fn(async<T>(key: string, data: T, ttl?: number) => {
        const timestamp: number = Date.now();
        const ttlTarget: number = 60;
        this._data[key] = {
            key: key,
            start: timestamp,
            end: timestamp + ttlTarget,
            ttl: ttlTarget,
            cached: false,
            data: data
        } as Cacheable<T>;
        return this._data[key];
    });
    del = jest.fn(async (key: string) => {
        delete this._data[key];
        return true;
    });
    reset = jest.fn(async () => {
        this._data = {};
    });

    store = jest.fn();
    on = jest.fn();
    removeListener = jest.fn();
    wrap = jest.fn();
}

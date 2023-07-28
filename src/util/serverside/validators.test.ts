import isReqInvalid, { Key } from "./validators";

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as any;

test("should return false if all keys are present", () => {
    const req = {
        body: {
            key1: "value1",
            key2: 2,
        },
        query: {
            key3: "value3",
            key4: 4,
        }
    } as any;
    const keys: Key[] = [
        { key: "key1", type: "string" },
        { key: "key2", type: "number" },
        { key: "key3", type: "string", dict: "query" },
        { key: "key4", type: "number", dict: "query" },
    ];

    const result = isReqInvalid(req, res, keys);

    expect(result).toBe(false);
});

test("should return true if a key is missing from the body", () => {
    const req = {
        body: {
            key1: "value1",
            key2: 2,
        },
        query: {
            key3: "value3",
            key4: 4,
        }
    } as any;
    const keys: Key[] = [
        { key: "key1", type: "string" },
        { key: "key2", type: "number" },
        { key: "key3", type: "string", dict: "query" },
        { key: "key4", type: "number", dict: "query" },
        { key: "key5", type: "string" },
    ];

    const result = isReqInvalid(req, res, keys);

    expect(result).toBe(true);
});

test("should return true if a key is missing from the query", () => {
    const req = {
        body: {
            key1: "value1",
            key2: 2,
            key5: "value5",
        },
        query: {
            key3: "value3",
            key4: 4,
        }
    } as any;
    const keys: Key[] = [
        { key: "key1", type: "string" },
        { key: "key2", type: "number" },
        { key: "key3", type: "string", dict: "query" },
        { key: "key4", type: "number", dict: "query" },
        { key: "key5", type: "string", dict: "query" },
    ];

    const result = isReqInvalid(req, res, keys);

    expect(result).toBe(true);
});

test("should return true if a type is wrong in the body or query", () => {
    const req = {
        body: {
            key1: "value1",
            key2: 2,
        },
        query: {
            key3: "value3",
            key4: 4,
        }
    } as any;
    const keysBody: Key[] = [
        { key: "key1", type: "number" },
        { key: "key2", type: "number" },
        { key: "key3", type: "string", dict: "query" },
        { key: "key4", type: "number", dict: "query" },
    ];
    const keysQuery: Key[] = [
        { key: "key1", type: "string" },
        { key: "key2", type: "number" },
        { key: "key3", type: "string", dict: "query" },
        { key: "key4", type: "string", dict: "query" },
    ];

    const resultBody = isReqInvalid(req, res, keysBody);
    const resultQuery = isReqInvalid(req, res, keysQuery);

    expect(resultBody).toBe(true);
    expect(resultQuery).toBe(true);
});
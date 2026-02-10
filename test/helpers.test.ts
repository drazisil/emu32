// @ts-nocheck
import {describe, test, expect} from "vitest"
import {getByte, getLong, getShort, putLong} from "../src/helpers.ts"
import { before } from "node:test"

describe("getByte", () => {
    const testBuffer = Buffer.from([0x01, 0x02, 0x08, 0x1b])

    test('gets a byte', () => {
        expect(getByte(testBuffer, 2)).eq(0x08)
    })
    test("fails when passed an invalid offset", () => {
        expect(() => getByte(testBuffer, -6)).throws()
        expect(() => getByte(testBuffer, 50)).throws()
    })
    test("fails when passed an empty buffer", () => {
        expect(() => getByte(undefined, 6)).throws()
    })
})

describe("getLong", () => {
    const testBuffer = Buffer.from([8, 0x0e, 0x4f, 0x04, 0x1f, 7])

    test("get a long", () => {
        expect(getLong(testBuffer, 1)).eq(520376078)
    })
    test("fails when passed an invalid offset", () => {
        expect(() => getLong(testBuffer, -3)).throws()
        expect (() => getLong(testBuffer, 8)).throws()
    })
    test("fails when passed an undefined buffer", () => {
        expect(()=> getLong(undefined, 0)).throws()
    })
})


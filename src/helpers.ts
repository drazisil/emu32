export function trimOffPathAndFilename(argv: string[]) {
    return argv.slice(2);
}

export function getByte(data: Buffer, offset: number) {
    return data.readInt8(offset)
}

export function getShort(data: Buffer, offset: number) {
    return data.readUInt16LE(offset)
}

export function getLong(data: Buffer, offset: number) {
    return data.readUInt32LE(offset)
}

export function putLong(data: Buffer, offset: number, value: number) {
    data.writeUInt32LE(value, offset)
}

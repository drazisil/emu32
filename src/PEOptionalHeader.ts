import { InvalidFormatCodeError, NotSupportedPEFormat } from "./errors.ts"
import { getByte, getLong, getShort } from "./helpers.ts"

const PE32 = 0x10b
const PE32Plus = 0x20b

class PEOptionalHeader32 {
    private imageBase // 4
    private sectionAlignment // 4
    private fileAlignmnt // 4
    private majorOpereratingSystemVersion // 2
    private minorOperatingSystemVersion // 2
    private majorImageVersion // 2
    private minorImageVersion // 2
    private majorSubsystemVersion // 2
    private minorSubsystemVersion // 2
    private win32VersionValue // 4

    constructor(data: Buffer) {
        
    }

    static Parse(data: Buffer): PEOptionalHeader32 {
        return new PEOptionalHeader32(data)
    }

    toString() {
        return "".concat(

        )
    }
}
class PEOptionalHeader64 {
    static Parse(data: Buffer<ArrayBufferLike>): PEOptionalHeader64 {
        throw new NotSupportedPEFormat()
    }
}

export class PEOptionalHeader {
    private peFormatMagicNumber: number // 2
    private majorLinkerVersion // 1
    private minorLinkerVersion // 1
    private sizeOfCode // 4
    private sizeOfInitializedData // 4
    private sizeofUninitializedData // 4
    private addressOfEntryPoint // 4
    private baseOfCode // 4
    private extraFields: PEOptionalHeader32 | PEOptionalHeader64

    constructor(data: Buffer) {
        this.peFormatMagicNumber = getShort(data, 0)
        this.majorLinkerVersion = getByte(data, 2)
        this.minorLinkerVersion = getByte(data, 3)
        this.sizeOfCode = getLong(data, 4)
        this.sizeOfInitializedData = getLong(data, 8)
        this.sizeofUninitializedData = getLong(data, 12)
        this.addressOfEntryPoint = getLong(data, 16)
        this.baseOfCode = getLong(data, 20)
        const startOfExtraFields = 24
        this.extraFields = this.peFormat === "PE32" ? PEOptionalHeader32.Parse(data.subarray(startOfExtraFields)) : PEOptionalHeader64.Parse(data.subarray(startOfExtraFields))
    }

    static Parse(data: Buffer): PEOptionalHeader {
        return new PEOptionalHeader(data)
    }

    get peFormat() {
        if (this.peFormatMagicNumber != PE32 && this.peFormatMagicNumber != PE32Plus)
            throw new InvalidFormatCodeError(this.peFormatMagicNumber.toString(16))
        return this.peFormatMagicNumber === PE32 ? "PE32" : "PE32+"
    }

    toString() {
        return "".concat("Optional Header\n",
            `PE Format: ${this.peFormat}\n`,
            `Linker version ${this.majorLinkerVersion}.${this.minorLinkerVersion}\n`,
            `Size of Code: ${this.sizeOfCode}\n`,
            `Size of initialized data: ${this.sizeOfInitializedData}\n`,
            `Size of uninitialized data: ${this.sizeofUninitializedData}\n`,
            `Address of entry point: ${this.addressOfEntryPoint.toString(16)}\n`,
            `Base of code: ${this.baseOfCode.toString(16)}\n`,
            this.extraFields.toString()
        )
    }
 }

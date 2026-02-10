import { DataDirectoryList } from "./DataDirectory.ts"
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
    private sizeOfImage // 4
    private sizeOfHeader // 4
    private checksum // 4
    private subsystem // 2
    private dllCharacteristics // 2
    private sizeOfStackReserve // 8
    private sizeOfStackCommit // 8
    private sizeOfHeapReserve // 8
    private sizeOfHeapCommit // 8
    private loaderFlags // 4
    private numberOfRvaAndSizes // 4
    private dataDirectories // 

    constructor(data: Buffer) {
        this.imageBase = getLong(data, 0)
        this.sectionAlignment = getLong(data, 4)
        this.fileAlignmnt = getLong(data, 8)
        this.majorOpereratingSystemVersion = getShort(data, 12)
        this.minorOperatingSystemVersion = getShort(data, 14)
        this.majorImageVersion = getShort(data, 16)
        this.minorImageVersion = getShort(data, 18)
        this.majorSubsystemVersion = getShort(data, 20)
        this.minorSubsystemVersion = getShort(data, 22)
        this.win32VersionValue = getLong(data, 24)
        this.sizeOfImage = getLong(data, 28)
        this.sizeOfHeader = getLong(data, 32)
        this.checksum = getLong(data, 36)
        this.subsystem = getShort(data, 40)
        this.dllCharacteristics = getShort(data, 42)
        this.sizeOfStackReserve = getLong(data, 44)
        this.sizeOfStackCommit = getLong(data, 48)
        this.sizeOfHeapReserve = getLong(data, 52)
        this.sizeOfHeapCommit = getLong(data, 56)
        this.loaderFlags = getLong(data, 60)
        this.numberOfRvaAndSizes = getLong(data, 64)
        this.dataDirectories = DataDirectoryList.Read(data.subarray(68), this.numberOfRvaAndSizes)
    }

    static Parse(data: Buffer): PEOptionalHeader32 {
        return new PEOptionalHeader32(data)
    }

    toString() {
        return "".concat(
            `Image base: ${this.imageBase}\n`,
            `Section alignment: ${this.sectionAlignment}\n`,
            `File alignment: ${this.fileAlignmnt}\n`,
            `OS Version: ${this.majorOpereratingSystemVersion}.${this.minorOperatingSystemVersion}\n`,
            `Image version: ${this.majorImageVersion}.${this.minorImageVersion}\n`,
            `Subsystem Version: ${this.majorSubsystemVersion}.${this.minorSubsystemVersion}\n`,
            `Win32 version: ${this.win32VersionValue}\n`,
            `Size of Image: ${this.sizeOfImage}\n`,
            `Size of headers: ${this.sizeOfHeader}\n`,
            `Subsystem: ${this.subsystem}\n`,
            `DLL Characteristics: ${this.dllCharacteristics}\n`,
            `Size of Stack reserve: ${this.sizeOfStackReserve}\n`,
            `Size of Stack commit: ${this.sizeOfStackCommit}\n`,
            `Size of Heap reserve: ${this.sizeOfHeapReserve}\n`,
            `Size of Heap Commit: ${this.sizeOfHeapCommit}\n`,
            `Loader flag: ${this.loaderFlags}\n`,
            `Number of data directiories: ${this.numberOfRvaAndSizes}\n`,
            this.dataDirectories.toString()
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
    private baseOfData // 4
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
        this.baseOfData = getLong(data, 24)
        const startOfExtraFields = 28
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
